require('dotenv').config()
import PubModel from "../../../models/index";
import {NextResponse, NextRequest} from "next/server";
const {MongoClient} = require("mongodb");
const collectionName = process.env.NEXT_PUBLIC_COLLECTION_NAME;

let cachedDb: boolean = false;
const connectToDb = async () => {
  if (cachedDb) {
    return cachedDb;
  }
  let client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);
  await client.connect();
  const db = await client.db(collectionName);
  cachedDb = db;
  return db;
};

export async function POST(req: NextRequest) {
  // if (!res.ok || !res.body) return;
  try {
    // Connect to db
    const db = await connectToDb();

    // Collection reference (pubs)
    const collection = await db.collection("pubs");

    // Creating pub data
    const body = await req.json();
    const pub = new PubModel({
      name: body.name,
      price: body.price,
      drink: body.drink,
      full_address: body.full_address,
      address: body.address,
      borough: body.borough,
      coordinates: body.coordinates,
      type: body.type,
      date: body.date || ''
    });
    // Insert the document into the specified collection
    const savePub = await collection.insertOne(pub);
    console.log('savePub', savePub)
    if (!savePub) {
      return NextResponse.json({status: 500, msg: "Not Saved", data: [] });
    }
    const refetchData = await collection.find();
    const updatedData = await refetchData.toArray();
    return NextResponse.json({status: 200, msg: "Saved", data: updatedData});
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      error: 500,
      message: "Something went wrong.",
    });
  }
}
export async function GET() {
  try {
    console.log('GET request')
    //Connect to db
    const db = await connectToDb();
    console.log("Successfully connected to Atlas");
    if (!db) {
      return NextResponse.json({status: 500, msg: "Error establishing a database connection.", data: [] });
    }
    // Collection reference (pubs)
    const collection = await db.collection("pubs");
    // Get all documents
    const pubs = collection.find();
    if (!pubs) {
      return NextResponse.json({status: 502, msg: "Server cannot provide data at this time.", data: [] });
    }
    const json = await pubs.toArray();
    return NextResponse.json({status: 200, message: 'Success', data: json});
  } catch (error) {
    return NextResponse.json({
      code: 500,
      message: "Something went wrong.",
    });
  }
}
