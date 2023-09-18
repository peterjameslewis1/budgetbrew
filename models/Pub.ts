import {prop} from "@typegoose/typegoose";
import {nanoid} from "nanoid";

export class Pub {
  @prop({default: () => nanoid(9)})
  _id: string;
  @prop()
  name: string;

  @prop()
  drink: string;

  @prop()
  price: string;

  @prop()
  full_address: string;

  @prop()
  address: string;

  @prop()
  borough: string;

  @prop()
  type: string;

  @prop({default: {lat: "", lon: ""}})
  coordinates: {lat: ""; lon: ""};

  @prop({default: () => new Date()})
  date: Date;
}
