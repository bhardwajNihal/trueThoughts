
"use server"
import { dbClient } from "@/db/dbClient";
import { getMoodById } from "@/lib/moods";
import { auth } from "@clerk/nextjs/server";

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