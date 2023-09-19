import { SubmitData } from "@/app/types/Types";
// import GoogleMapReact from 'google-map-react';
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ posts = [], center = {lat: 51.499670, lng: -0.137480}, zoom = 10 }: { posts: SubmitData[], center: object, zoom: number }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

    return (
        //The <Map></Map> need the following props
        //initialCenter={} will be the center on the Map
        <div className="map-wrapper">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
        mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: 51.499670, lng: -0.137480 }} />
        </GoogleMap>
      )}
        </div>
    )
}
export default Map