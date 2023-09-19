"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = new mongoose.Schema({
    name: {
        type: String,
        min: 1,
        max: 255
    },
    drink: {
        type: String,
        min: 1,
        max: 255
    },
    price: {
        type: String,
        max: 255
    },
    full_address: {
        type: String
    },
    address: {
        type: String
    },
    borough: {
        type: String
    },
    coordinates: {
        lat: {
            type: String
        },
        lon: {
            type: String
        }
    },
    type: {
        type: String
    },
    date: {
        type: Date
    }
});
var PubModel = mongoose.model("PubModel", Schema);
exports["default"] = PubModel;
