"use server";

import { dbClient } from "@/db/dbClient";
import { aj } from "@/lib/arcjet";
import { getPixabayImage } from "@/lib/getImage";
import { MOODS } from "@/lib/moods";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import { revalidatePath } from "next/cache";
import { toast } from "sonner";

// server actions directly enables us to do all tasks that are done by apis
// but without writing separate apis. These are just functions doing all the server related tasks, like talking to a db.

export async function addJournalEntry(data) {
  try {
    // check if session valid
    const { userId } = await auth();

    if (!userId) {
      throw new Error("Unauthorized request!");
    }


// arcjet rate limiting
    const req = await request();
    const decision = await aj.protect(req, { userId, requested: 1 }); // Deduct 1 tokens from the bucket per request
    // console.log("Arcjet decision", decision);

    if (decision.isDenied()) {

      if (decision.reason.isRateLimit()) {
    //     console.error( {
    //       code: "RATE_LIMIT_EXCEEDED",
    //       details: {
    //         remaining_requests: decision.reason.remaining,
    //         resetIn: decision.reason.resetTime,
    //       }});
        
    //     throw new Error("Too many Requests! Try again later.");

    //   }
        throw new Error("Request blocked due to some reason");
    }}

    // find user
    const foundUser = await dbClient.User.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!foundUser) throw new Error("User not found!");

    // get mood data
    const moodData = await MOODS[data.mood.toUpperCase()];

    if (!moodData) throw new Error("Invalid mood!");

    const moodImageUrl = await getPixabayImage(moodData.pixabayQuery);

    // finally make an entry to db
    const newJournalEntry = await dbClient.Entry.create({
      data: {
        title: data.title,
        content: data.content,
        mood: moodData.id,
        moodScore: moodData.score,
        moodImageUrl,
        userId: foundUser.id,
        collectionId: data.collectionId || null,
      },
    });

    // once the entry is added, any draft present should be deleted
    await dbClient.Draft.deleteMany({
      where: {
        userId: foundUser.id,
      },
    });

    // revalidate dashboard
    revalidatePath("/dashboard");

    // finally return the freshly created entry
    return newJournalEntry;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
