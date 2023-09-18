export type SubmitData = {
  _id: string;
  name: string;
  price: string;
  drink: string;
  full_address: string;
  address: string;
  borough: string;
  coordinates: {
    lat: string;
    lon: string;
  };
  type: string;
  date: Date;
  content: {
    locality: string;
  };
  maki: string;
  mapbox_id: string;
  context: {
    locality: {name: string};
  };
};
