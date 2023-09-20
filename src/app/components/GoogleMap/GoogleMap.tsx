import { SubmitData } from "@/app/types/Types";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

type GoogleMapProps = {
  posts: SubmitData[],
  center: {
    lat: number;
    lng: number;
  },
  zoom: number,
  googleMapsApiKey: string | undefined
}

const Map = ({ posts = [], center = {lat: 51.499670, lng: -0.137480}, zoom = 10, googleMapsApiKey = '' }: GoogleMapProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey
  });
if (googleMapsApiKey === '') {
   return <div>Error</div>;
  }
    return (
        <div className="map-wrapper">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
        mapContainerClassName="map-container"
          center={center}
          zoom={zoom}
        >
          <div>
          { posts.length > 0 && posts.map((post: SubmitData) => {
            return <MarkerF key={post._id} position={{ lat: Number(post.coordinates.latitude), lng: Number(post.coordinates.longitude) }} />
          })}
          </div>
        </GoogleMap>
      )}
        </div>
    )
}
export default Map
