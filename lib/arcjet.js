import arcjet from "@arcjet/next";
import { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
  characteristics: ["userId"], // track requests by a custom user ID
  rules: [
    // Create a token bucket rate limit.
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      refillRate: 10, // refill 10 tokens per interval
      interval: 60*60*1000, // refill every 1 hr
      capacity: 10, // bucket maximum capacity of 10 tokens
    }),
  ],
});