import { currentUser } from "@clerk/nextjs/server";
import { dbClient } from "./dbClient";

// function to check simply if the user exists in the db,
// if so return the userData
// if not create a new entry to the db with clerks credentials

export async function checkUser() {
  const user = await currentUser();
  
  if (!user) {
    return null;
  }

  try {
    const foundUser = await dbClient.User.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });
  
    if (foundUser) {
      return foundUser;
    }
  
    const createdUser = await dbClient.User.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  
    return createdUser;
    
  } catch (error) {
    console.error("Error validating user!");
    return error;
  }
}
