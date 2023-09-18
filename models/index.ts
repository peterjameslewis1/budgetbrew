// models/index.ts
import {Pub} from "./Pub";
import {getModelForClass} from "@typegoose/typegoose";
const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  id: {
    type: String,
  },
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
    lon: {
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

const PubModel = mongoose.model("PubModel", Schema);
export default PubModel;
