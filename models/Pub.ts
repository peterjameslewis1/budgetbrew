import {prop} from "@typegoose/typegoose";
export class Pub {
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

  @prop({default: {lat: "", lng: ""}})
  coordinates: {lat: ""; lon: ""};

  @prop({default: () => new Date()})
  date: Date;
}
