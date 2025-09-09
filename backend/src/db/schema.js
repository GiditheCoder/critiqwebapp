import {pgTable, serial, text, timestamp, integer , uniqueIndex } from 'drizzle-orm/pg-core';

export const favoritesTable = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  recipeId: integer("recipe_id").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  cookTime: text("cook_time"),
  servings: text("servings"),
  createdAt: timestamp("created_at").defaultNow(),
});


// create a table for the votes
// export const votesTable = pgTable("votes", {
//    id: serial("id").primaryKey(),
//    songId: text("song_id").notNull(), // references songs table
//    voteCount: integer("vote_count").notNull().default(0),
//    createdAt: timestamp("created_at").defaultNow(),
// });



export const votesTable = pgTable(
  "votes",
  {
    id: serial("id").primaryKey(),
    songId: text("song_id").notNull(),
    voteCount: integer("vote_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    songIdUnique: uniqueIndex("votes_song_id_unique").on(t.songId), // make songId unique
  })
);


export const userVotesTable = pgTable("user_votes", {
   id: serial("id").primaryKey(),
   userId: text("user_id").notNull(),     // references users table
   songId: text("song_id").notNull(),     // references songs table
   createdAt: timestamp("created_at").defaultNow(),
});
