import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { votesTable, userVotesTable } from "./db/schema.js";
import { eq, sql } from "drizzle-orm";
import job from "./config/cron.js";
import cors from "cors";
import { Webhook } from "svix";
import { Clerk } from "@clerk/clerk-sdk-node";


const app = express();
const PORT = ENV.PORT || 8001;
export const clerkClient = new Clerk({
  secretKey: ENV.CLERK_SECRET_KEY, // use the new secret key env variable
});
const CLERK_WEBHOOK_SECRET = ENV.CLERK_WEBHOOK_SECRET;

// if (ENV.NODE_ENV === "production") job.start();

app.use(cors());


// ---------- Health Check ----------
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

// ---------- Add Votes ----------
app.post("/api/votes", async (req, res) => {
  try {
    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ error: "Missing required field: songId" });
    }

    const [vote] = await db
      .insert(votesTable)
      .values({ songId, voteCount: 1 })
      .onConflictDoUpdate({
        target: votesTable.songId,
        set: { voteCount: sql`${votesTable.voteCount} + 1` },
      })
      .returning();

    res.status(200).json(vote);
  } catch (error) {
    console.error("Error creating/incrementing vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------- Delete the Votes ----------
app.delete("/api/votes", async (req, res) => {
  try {
    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ error: "Missing required field: songId" });
    }

    const [existingVote] = await db
      .select()
      .from(votesTable)
      .where(eq(votesTable.songId, songId));

    if (!existingVote) {
      return res.status(404).json({ error: "Vote not found for this song" });
    }

    if (existingVote.voteCount <= 1) {
      await db.delete(votesTable).where(eq(votesTable.songId, songId));
      return res.status(200).json({ message: "Vote removed completely" });
    } else {
      const [updatedVote] = await db
        .update(votesTable)
        .set({ voteCount: sql`${votesTable.voteCount} - 1` })
        .where(eq(votesTable.songId, songId))
        .returning();

      res.status(200).json(updatedVote);
    }
  } catch (error) {
    console.error("Error removing vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------- Get the  Votes ----------
app.get("/api/votes", async (req, res) => {
  try {
    const allVotes = await db.select().from(votesTable);
    res.status(200).json(allVotes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------- User Votes ----------
app.post("/api/user_votes", async (req, res) => {
  try {
    const { userId, songId } = req.body;
    if (!userId || !songId) {
      return res
        .status(400)
        .json({ error: "Missing required fields: userId and songId" });
    }

    const newUserVote = await db
      .insert(userVotesTable)
      .values({ userId, songId })
      .returning();

    res.status(201).json(newUserVote[0]);
  } catch (error) {
    console.error("Error creating user vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------- Clerk Webhook ----------
app.post(
  "/api/clerk-webhook",
  express.raw({ type: "application/json" }), // raw body
  async (req, res) => {
    try {
      const wh = new Webhook(CLERK_WEBHOOK_SECRET);
      // req.body is a Buffer here
      const payload = req.body; // keep as Buffer

      console.log("📦 Raw payload string:", payload.toString("utf8"));

      const headers = {
        "svix-id": req.header("svix-id"),
        "svix-timestamp": req.header("svix-timestamp"),
        "svix-signature": req.header("svix-signature"),
      };

      console.log("🔑 Svix headers:", headers);

      // Verify webhook
      const evt = wh.verify(payload, headers);
      console.log("🔔 Webhook received:", evt.type);

      if (evt.type === "user.created") {
        const { id, unsafe_metadata } = evt.data;

        const role =
          unsafe_metadata?.chosenRole === "artiste" ? "artiste" : "listener";

        // Small delay to ensure user exists in Clerk backend
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          await clerkClient.users.updateUser(id, {
            publicMetadata: { role },
          });
          console.log(`✅ Assigned role "${role}" to user ${id}`);
        } catch (err) {
          console.error(
            `⚠️ Could not update user ${id}. They may not exist yet:`,
            err.errors || err.message
          );
        }
      }

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Webhook error:", err);
      res.status(400).json({ error: err.message || "Invalid webhook" });
    }
  }
);



app.use(express.json());


// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log("Server is running123 on PORT:", PORT);
});




// import express from 'express';
// import { ENV } from './config/env.js';
// import {db} from "./config/db.js";
// import { votesTable , userVotesTable } from './db/schema.js';
// import { and, eq , sql } from "drizzle-orm";
// import job from "./config/cron.js";
// import cors from 'cors';
// import { Webhook } from "svix";
// import { clerkClient } from "@clerk/clerk-sdk-node";

 
 

// // this is where you run the functions such as te post , get, patch etc
// const app = express();
// const PORT = ENV.PORT || 8001

// //  if( ENV.NODE_ENV === "production")   job.start()

// app.use(cors()); 
// app.use(express.json())

// // test the health
// app.get("/api/health", (req, res)=>{
//     res.status(200).json({success:true})
// })


// // to add vote
// app.post("/api/votes", async (req, res) => {
//   try {
//     const { songId } = req.body;

//     if (!songId) {
//       return res.status(400).json({ error: "Missing required field: songId" });
//     }

//     // Upsert: insert or increment existing
//     const [vote] = await db
//       .insert(votesTable)
//       .values({
//         songId,
//         voteCount: 1, // default if new
//       })
//       .onConflictDoUpdate({
//         target: votesTable.songId,
//         set: {
//           voteCount: sql`${votesTable.voteCount} + 1`, // increment if exists
//         },
//       })
//       .returning();

//     res.status(200).json(vote);
//   } catch (error) {
//     console.error("Error creating/incrementing vote:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


// // to remove vote 

// // Decrement / remove vote
// // Remove / decrement a vote
// app.delete("/api/votes", async (req, res) => {
//   try {
//     const { songId } = req.body;

//     if (!songId) {
//       return res.status(400).json({ error: "Missing required field: songId" });
//     }

//     // Fetch current vote count
//     const [existingVote] = await db
//       .select()
//       .from(votesTable)
//       .where(eq(votesTable.songId, songId));

//     if (!existingVote) {
//       return res.status(404).json({ error: "Vote not found for this song" });
//     }

//     if (existingVote.voteCount <= 1) {
//       // Delete the record if count is 1 or less
//       await db.delete(votesTable).where(eq(votesTable.songId, songId));
//       return res.status(200).json({ message: "Vote removed completely" });
//     } else {
//       // Decrement vote count
//       const [updatedVote] = await db
//         .update(votesTable)
//         .set({
//           voteCount: sql`${votesTable.voteCount} - 1`,
//         })
//         .where(eq(votesTable.songId, songId))
//         .returning();

//       res.status(200).json(updatedVote);
//     }
//   } catch (error) {
//     console.error("Error removing vote:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });




// app.get("/api/votes", async (req, res) => {
//   try {
//     // Fetch all votes from votesTable
//     const allVotes = await db.select().from(votesTable);

//     // Return as JSON
//     res.status(200).json(allVotes);
//   } catch (error) {
//     console.error("Error fetching votes:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


// // thisis for the user votes 
// app.post("/api/user_votes", async (req, res) => {
//   try {
//     const { userId, songId } = req.body;

//     if (!userId || !songId) {
//       return res.status(400).json({ error: "Missing required fields: userId and songId" });
//     }

//     const newUserVote = await db
//       .insert(userVotesTable)
//       .values({
//         userId,
//         songId,
//       })
//       .returning();

//     res.status(201).json(newUserVote[0]);
//   } catch (error) {
//     console.error("Error creating user vote:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });




// // this is the webhook part
// // Clerk webhook to assign roles securely

// // 
// // put this BEFORE any other route using express.json()
// app.post(
//   "/api/clerk-webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     try {
//       const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//       // Important: convert buffer → string before verify
//       const payload = req.body.toString("utf8");
//       const evt = wh.verify(payload, req.headers);

//       console.log("🔔 Webhook received:", evt.type);

//       if (evt.type === "user.created") {
//         const { id, unsafe_metadata } = evt.data;
//         const role =
//           unsafe_metadata?.chosenRole === "artiste" ? "artiste" : "listener";

//         await clerkClient.users.updateUser(id, {
//           publicMetadata: { role },
//         });

//         console.log(`✅ Assigned role "${role}" to user ${id}`);
//       }

//       res.json({ success: true });
//     } catch (err) {
//       console.error("❌ Webhook error:", err);
//       res.status(400).json({ error: err.message || "Invalid webhook" });
//     }
//   }
// );



// // any chnages made to this part wold reflect in the terminal
// app.listen(PORT, ()=>{
//     console.log("Server is running123 on PORT:",PORT)
// })









// app.post("/api/clerk-webhook", express.raw({ type: "application/json" }), async (req, res) => {
//   try {
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
//     const evt = wh.verify(req.body, req.headers);

//     console.log("🔔 Webhook received:", evt.type);

//     if (evt.type === "user.created") {
//       const { id, unsafe_metadata } = evt.data;

//       // Use chosenRole from unsafe_metadata if present, otherwise default to listener
//       const role =
//         unsafe_metadata && unsafe_metadata.chosenRole === "artiste"
//           ? "artiste"
//           : "listener";

//       // Save validated role into publicMetadata
//       await clerkClient.users.updateUser(id, {
//         publicMetadata: { role },
//       });

//       console.log(`✅ Assigned role "${role}" to user ${id}`);
//     }

//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ Webhook error:", err);
//     res.status(400).json({ error: "Invalid webhook" });
//   }
// });

