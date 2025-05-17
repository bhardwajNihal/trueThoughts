import { PrismaClient } from "@prisma/client";

// defining a singleton db client instance to avoid duplicate connections everytime our app hot-reloads

// this creates a new db instance for the very 1st time, 
// then stores is in a global context and reuses that particular instance to talk to db, instead of creating a duplicate one
export const dbClient = globalThis.primsa || new PrismaClient();

// a problem specific to dev environment only 
if(process.env.NODE_ENV!=="production"){
    globalThis.prisma = dbClient
}