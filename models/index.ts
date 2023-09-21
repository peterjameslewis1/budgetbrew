// models/index.ts
import {Pub} from "./Pub";
import {getModelForClass} from "@typegoose/typegoose";
import mongoose from "mongoose";

const post = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 255,
  },
  drink: {
    type: String,
    min: 1,
    max: 255,
  },
  price: {
    type: String,
    max: 255,
  },
  full_address: {
    type: String,
  },
  address: {
    type: String,
  },
  borough: {
    type: String,
  },
  coordinates: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const PubModel = mongoose.models.PubModel || mongoose.model("PubModel", post);
export default PubModel;
