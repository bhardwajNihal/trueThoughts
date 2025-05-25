import { dbClient } from "@/db/dbClient";
import { auth } from "@clerk/nextjs/server";


export async function getDraft() {
    
 try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized request!");
    }

    // find user
    const foundUser = await dbClient.User.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    
    if (!foundUser) throw new Error("User not found!");

    // find draft
    const draft = await dbClient.Draft.findUnique({
      where : {
        userId : foundUser.id
      }
    })

    revalidatePath("/dashboard")
    return draft;

  } catch (error) {
    throw error;
  }

}

export async function saveDraft(data) {
    
 try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized request!");
    }

    // find user
    const foundUser = await dbClient.User.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    
    if (!foundUser) throw new Error("User not found!");

    
    // now upsert to the draft table
    // i.e --> if exists --> update, if not exists --> create a new one

    const createdDraft = await dbClient.Draft.upsert({
        where : {
            userId : foundUser.id
        },
        create : {
            title : data.title,
            content : data.content,
            mood : data.mood,
            userId : foundUser.id
        },
        update : {
            title : data.title,
            content : data.content,
            mood : data.mood,
        }
    })



    revalidatePath("/dashboard")
    return createdDraft;

  } catch (error) {
    throw error;
  }

}
