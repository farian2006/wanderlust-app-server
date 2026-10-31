import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

import { MongoClient, ObjectId } from "mongodb";

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

const mongoClient = await connectToMongoDB();
const db = mongoClient.db("wanderlast-app");
const destinationsCollection = db.collection("destinations");

app.post("/add-destination", async (req, res) => {
  const data = req.body;
  const result = await destinationsCollection.insertOne(data);
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Hello User! Welcome to Wanderlast App Server");
});

app.get("/destinations", async (req, res) => {
  const destinations = await destinationsCollection.find({}).toArray();
  res.send(destinations);
});

app.get("/destinations/:id",async(req,res)=> {
  const {id} = req.params;
  const result = await destinationsCollection.findOne({_id:new ObjectId(id)})
  res.send(result);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
