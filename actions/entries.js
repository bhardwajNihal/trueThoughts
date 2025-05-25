
"use server"
import { dbClient } from "@/db/dbClient";
import { aj } from "@/lib/arcjet";
import { getMoodById } from "@/lib/moods";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getEntries({collectionId, orderBy = "desc"} = {}) {    //decreasing order by default
    
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("Request Unauthorized!");
    
        
        const foundUser = await dbClient.User.findUnique({
            where : {
                clerkUserId : userId
            }
        })
        
        if(!foundUser) throw new Error("User not found!");
    
        // collection query, to return entries based on collection
        let collectionQuery = {};       // if none of "miscellaneous" or cId provided will resort to empty {}, thus returning all entries
        
        if(collectionId=="miscellaneous"){      // if asked for unorganized collections
            collectionQuery = {collectionId : null} 

            
        }
        else if(collectionId){      // if collection id is provided
            collectionQuery = {collectionId : collectionId};

            
        }
        
        const entries = await dbClient.Entry.findMany({
            where : {
                userId : foundUser.id,
                ...collectionQuery      // spreading to get key value pair not the object       
            },
            include : {         // populate collection info
                collection : {
                    select : {
                        id : true,
                        name : true,
                        description : true,
                    }
                }
            },
            orderBy : {
                createdAt : orderBy
            }
        })
        
        //adding detailed mood data to the entry
        const entryWithMoodDetails = entries.map((entry) => ({
            ...entry,
            moodDetails : getMoodById(entry.mood)
        }))

        return entryWithMoodDetails;
    } catch (error) {
        throw error
    }
}


export async function getEntry(entryId) {    //decreasing order by default
    
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("Request Unauthorized!");
    
        
        const foundUser = await dbClient.User.findUnique({
            where : {
                clerkUserId : userId
            }
        })
        
        if(!foundUser) throw new Error("User not found!");
    
        const entry = await dbClient.Entry.findUnique({
            where : {
                id : entryId
            },
            include : {
                collection : {
                    select : {
                        id : true,
                        name : true
                    }
                }
            }
        })

        return entry;
    } catch (error) {
        throw error
    }
}

export default  async function deleteEntry(entryId) {
     try {
        const {userId} = await auth();
        if(!userId) throw new Error("Request Unauthorized!");
    
        
        const foundUser = await dbClient.User.findUnique({
            where : {
                clerkUserId : userId
            }
        })
        
        if(!foundUser) throw new Error("User not found!");
    
        const foundEntry = await dbClient.Entry.findUnique({
            where : {
                id : entryId
            }
        })
        if(!foundEntry) throw new Error("entry not found!");

        const deletedEntry = await dbClient.Entry.delete({
            where : {
                id : foundEntry.id
            }
        })

        return deletedEntry;
    } catch (error) {
        throw error;
    }
}


export async function updateJournalEntry(entry) {
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
        console.error({
          code: "RATE_LIMIT_EXCEEDED",
          details: {
            remaining_requests: decision.reason.remaining,
            resetIn: decision.reason.resetTime,
          },
        });

        throw new Error("Too many Requests! Try again later.");
      }
      throw new Error("Request blocked due to some reason");
    }

    // find user
    const foundUser = await dbClient.User.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!foundUser) throw new Error("User not found!");

    // find existing entry
    const existingEntry = await dbClient.Entry.findFirst({
        where : {
            userId : foundUser.id,
            id : entry.id
        }
    })
    if(!existingEntry){
        throw new Error("entry not found!")
    }

    // get mood data
    const moodData = await MOODS[entry.mood.toUpperCase()];

    if (!moodData) throw new Error("Invalid mood!");

    const moodImageUrl = await getPixabayImage(moodData.pixabayQuery);

    // finally make an entry to db
    const updatedJournalEntry = await dbClient.Entry.update({
        where : {
            id : existingEntry.id
        },
        data: {
        title: entry.title,
        content: entry.content,
        mood: moodData.id,
        moodScore: moodData.score,
        moodImageUrl,
        collectionId: data.collectionId || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/journal/${entry.id}`)

    return updatedJournalEntry;
  } catch (error) {
    throw error;
  }
}
