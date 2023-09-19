import PubModel from "../../../models/index";
import {NextResponse, NextRequest} from "next/server";
const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);
<<<<<<< HEAD
// const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);
const collectionName = process.env.NEXT_PUBLIC_COLLECTION_NAME;
=======
const collectionName = process.env.NEXT_PUBLIC_COLLECTION_NAME;

>>>>>>> 1a2c1f331ec985f2b36a4f868dde346758e23cb5
type Pub = {
  name: string;
  price: string;
  drink: string;
};

export async function POST(req: NextRequest) {
  // if (!res.ok || !res.body) return;
  try {
    // Connect to db
    await client.connect();
    console.log("Successfully connected to Atlas");

    // Reference of db collection (budgetbrews)
    const db = client.db(collectionName);

    // Collection reference (pubs)
    const collection = db.collection("pubs");

    // Creating pub data
    const body = await req.json();
    console.log("body", body);
    const pub: Pub = new PubModel({
      name: body.name,
      price: body.price,
      drink: body.drink,
      full_address: body.full_address,
      address: body.address,
      borough: body.borough,
      coordinates: body.coordinates,
      type: body.type,
    });

    // Insert the document into the specified collection
    const savePub = await collection.insertOne(pub);
    const refetchData = await collection.find();
    const updatedData = await refetchData.toArray();

    console.log(savePub ? "Saved" : "Not saved");
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
    // Connect to db
    await client.connect();
    console.log("Successfully connected to Atlas");

    // Reference of db collection (budgetbrews)
    const db = client.db(collectionName);

    // Collection reference (pubs)
    const collection = db.collection("pubs");

    // Get all documents
    const pubs = collection.find();
    const json = await pubs.toArray();
    console.log("json", json);
    return NextResponse.json({status: 200, data: json});
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      code: 500,
      message: "Something went wrong.",
    });
  }
}
