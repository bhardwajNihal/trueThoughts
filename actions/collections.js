"use server";

import { dbClient } from "@/db/dbClient";
import { aj } from "@/lib/arcjet";
import { request } from "@arcjet/next";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addCollections(data) {
    
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error("Unauthorized request!");
    }

    // arcjet rate limiting
    const req = await request();
    const decision = await aj.protect(req, { userId, requested: 1 }); // Deduct 1 tokens from the bucket per request

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
            console.error( {
              code: "RATE_LIMIT_EXCEEDED",
              details: {
                remaining_requests: decision.reason.remaining,
                resetIn: decision.reason.resetTime,
              }});

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

    // check if collection with same name exists
    const collectionNameExists = await dbClient.Collection.findUnique({
        where : {
            name : data.name.toLowerCase()
        }
    })
    
    if(collectionNameExists){
        throw new Error("Collection with this name already exists!")
    }

    // add entry to collections
    const addedCollection = await dbClient.Collection.create({
      data: {
        name: data.name.toLowerCase(),
        description: data.description,
        userId: foundUser.id,
      },
    });
    
    revalidatePath("/dashboard");
    return addedCollection;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCollections() {
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

    // fetch the collections from the db belonging to the logged in user
    const collections = await dbClient.Collection.findMany({
      where: {
        userId: foundUser.id,
      },
      orderBy: { createdAt: "desc" },
    });

    return collections;

  } catch (error) {
    throw error;
  }
}



export async function getCollection(collectionName) {
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

    // fetch the collections from the db belonging to the logged in user
    const collection = await dbClient.Collection.findFirst({
      where: {
        userId: foundUser.id,
        name : collectionName
      },

    });
    
    return collection;

  } catch (error) {
    throw error;
  }
}



export async function getCollectionViaId(collectionId) {
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

    // fetch the collections from the db belonging to the logged in user
    const collection = await dbClient.Collection.findUnique({
      where: {
        userId: foundUser.id,
        id : collectionId
      },

    });
    
    return collection;

  } catch (error) {
    throw error;
  }
}


export async function deleteCollection(collectionName) {
  
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

    // find collection
    const collection = await dbClient.Collection.findUnique({
      where : {
        name : collectionName,
        userId : foundUser.id
      }
    })

    if(!collection) {
      throw new Error("Collection not found!")
    }

    // fetch the collections from the db belonging to the logged in user
    await dbClient.Collection.delete({
      where: {
        id : collection.id
      },

    });
    
    revalidatePath("/dashboard")
    return collection;

  } catch (error) {
    throw error;
  }
}
