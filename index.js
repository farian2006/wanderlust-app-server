import express from "express";
import "dotenv/config";

const app = express();

const PORT = 5000;

import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Hello User! Welcome to Wanderlast App Server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
