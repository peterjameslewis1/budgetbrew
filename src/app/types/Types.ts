export type SubmitData = {
  _id?: string;
  name: string;
  price: string;
  drink: string;
  full_address: string;
  address: string;
  borough: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: string;
  date: Date | string;
  content?: {
    locality: string;
  };
  mapbox_id: string;
  context?: {
    locality: {name: string};
  };
  newPub?: string;
  isWeatherspoons?: boolean;
  beerGarden?: boolean;
  sports?: boolean;
  happyHour?: boolean;
};

export type SearchBoxRetrieveResponse = {
  attribution?: string | undefined;
  features: {
    geometry: {coordinates: number[]; type: string};
    type: string;
    properties: {
      name: string;
      price: string;
      drink: string;
      full_address: string;
      address: string;
      borough: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
      type: string;
      date: Date;
      content: {
        locality: string;
      };
      maki: string;
      mapbox_id: string;
      context: {
        locality: {
          name: string;
        };
      };
    };
  }[];
  type: string;
  url: string;
};
