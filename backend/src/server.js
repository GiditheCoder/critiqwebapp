import express from 'express';
import { ENV } from './config/env.js';
import {db} from "./config/db.js";
import { votesTable , userVotesTable } from './db/schema.js';
import { and, eq , sql } from "drizzle-orm";
import job from "./config/cron.js";
import cors from 'cors';

 
 

// this is where you run the functions such as te post , get, patch etc
const app = express();
const PORT = ENV.PORT || 8001

//  if( ENV.NODE_ENV === "production")   job.start()

app.use(cors()); 
app.use(express.json())

// test the health
app.get("/api/health", (req, res)=>{
    res.status(200).json({success:true})
})


// to add vote
app.post("/api/votes", async (req, res) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "Missing required field: songId" });
    }

    // Upsert: insert or increment existing
    const [vote] = await db
      .insert(votesTable)
      .values({
        songId,
        voteCount: 1, // default if new
      })
      .onConflictDoUpdate({
        target: votesTable.songId,
        set: {
          voteCount: sql`${votesTable.voteCount} + 1`, // increment if exists
        },
      })
      .returning();

    res.status(200).json(vote);
  } catch (error) {
    console.error("Error creating/incrementing vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// to remove vote 

// Decrement / remove vote
// Remove / decrement a vote
app.delete("/api/votes", async (req, res) => {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({ error: "Missing required field: songId" });
    }

    // Fetch current vote count
    const [existingVote] = await db
      .select()
      .from(votesTable)
      .where(eq(votesTable.songId, songId));

    if (!existingVote) {
      return res.status(404).json({ error: "Vote not found for this song" });
    }

    if (existingVote.voteCount <= 1) {
      // Delete the record if count is 1 or less
      await db.delete(votesTable).where(eq(votesTable.songId, songId));
      return res.status(200).json({ message: "Vote removed completely" });
    } else {
      // Decrement vote count
      const [updatedVote] = await db
        .update(votesTable)
        .set({
          voteCount: sql`${votesTable.voteCount} - 1`,
        })
        .where(eq(votesTable.songId, songId))
        .returning();

      res.status(200).json(updatedVote);
    }
  } catch (error) {
    console.error("Error removing vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});




app.get("/api/votes", async (req, res) => {
  try {
    // Fetch all votes from votesTable
    const allVotes = await db.select().from(votesTable);

    // Return as JSON
    res.status(200).json(allVotes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// thisis for the user votes 
app.post("/api/user_votes", async (req, res) => {
  try {
    const { userId, songId } = req.body;

    if (!userId || !songId) {
      return res.status(400).json({ error: "Missing required fields: userId and songId" });
    }

    const newUserVote = await db
      .insert(userVotesTable)
      .values({
        userId,
        songId,
      })
      .returning();

    res.status(201).json(newUserVote[0]);
  } catch (error) {
    console.error("Error creating user vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// any chnages made to this part wold reflect in the terminal
app.listen(PORT, ()=>{
    console.log("Server is running123 on PORT:",PORT)
})













// app.post("/api/votes", async (req, res) => {
//   try {
//     const { songId } = req.body;

//     if (!songId) {
//       return res.status(400).json({ error: "Missing required field: songId" });
//     }

//     const newVote = await db
//       .insert(votesTable)
//       .values({
//         songId,
//         voteCount: 1, // default to 1 when creating
//       })
//       .returning();
      
//     res.status(201).json(newVote[0]);
//   } catch (error) {
//     console.error("Error creating vote:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });
