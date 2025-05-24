"use server";

import { dbClient } from "@/db/dbClient";
import { auth } from "@clerk/nextjs/server";

export async function getAnalytics(period = "7d") {
  try {
    // check session
    const { userId } = await auth();
    if (!userId) throw new Error("unauthorized request!");

    //finduser
    const foundUser = await dbClient.User.findUnique({
      where: {
        clerkUserId: userId,
      },
    });
    if (!foundUser) throw new Error("user not found !");

    //set time period
    const startDate = new Date(); // extract day from current date (2025-05-22) ==> 22
    switch (period) {
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "15d":
        startDate.setDate(startDate.getDate() - 15);
        break;
      case "30d":
        startDate.setDate(startDate.getDate() - 30);
        break;
      default:
        break;
    }

    //find entries after the start date
    const entriesAfterDate = await dbClient.Entry.findMany({
      where: {
        userId: foundUser.id,
        createdAt: {
          gte: startDate,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // segregate data date-wise
    const dateWiseEntries = entriesAfterDate.reduce((acc,entry) => {
      // get date key
      const date = entry.createdAt.toISOString().split("T")[0]; //extract just date (yyyy-mm-dd)

      if (!acc[date])
        acc[date] = {
          totalScore: 0,
          count: 0,
          entries: [],
        };
      acc[date].totalScore += entry.moodScore;
      acc[date].count += 1;
      acc[date].entries.push(entry);
      return acc;
    }, {});

    // Now create data to feed the chart
    const entryChartData = Object.entries(dateWiseEntries).map(
      ([date, data]) => {
        return {
          date,
          avgScore: Number(data.totalScore / data.count).toFixed(1),
          entryCount: data.count,
        };
      }
    );

    // create overall stats to show at the top
    // total entries in the given time period
    // average mood score
    // most frequent mood
    // daily average

    const overallStats = {
      totalEntries: entriesAfterDate.length,
      avgMoodScore: Number(
        entriesAfterDate.reduce((acc, entry) => (acc += entry.moodScore), 0) /
          entriesAfterDate.length
      ).toFixed(1),
      mostFrequentMood: Object.entries(
        entriesAfterDate.reduce((acc, entry) => {
          if (!acc[entry.mood]) {
            acc[entry.mood] = 0;
          }
          acc[entry.mood] += 1;
          return acc;
        }, {})
      ) // returns an array of moods and there respective number of occurances in teh array format
        .sort((a, b) => b[1] - a[1])[0]?.[0], // sorts in descending order, by comparing the successive elements // returns the 1st value of the 1 element of the sorted array

      dailyAvg: Number(
        entriesAfterDate.length /
          (period == "7d" ? 7 : period == "15d" ? 15 : 30)
      ).toFixed(),
    };

    // return data and stats
    return {
      success: true,
      data: {
        entryChartData,
        overallStats,
        entriesAfterDate,
      },
    };

  } catch (error) {
    throw error;
  }
}
