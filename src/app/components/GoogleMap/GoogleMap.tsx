import { useRef, useState } from "react";
import { SubmitData } from "@/app/types/Types";
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";

type GoogleMapProps = {
  posts: SubmitData[],
  center: {
    lat: number;
    lng: number;
  },
  zoom: number,
  googleMapsApiKey: string | undefined
}
type InfoWindowData = {
  name: string;
  id: string;
  borough: string;
  full_address: string;
}

const Map = ({ posts = [], center = {lat: 51.499670, lng: -0.137480}, zoom = 10, googleMapsApiKey = '' }: GoogleMapProps) => {
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData>({ id: '', name: '', borough: '', full_address: '' });
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey
  });
if (googleMapsApiKey === '') {
   return <div>Error</div>;
  }
  const handleMarkerClick = (id: string, name: string, borough: string, full_address: string) => {
    setInfoWindowData({ id, name, borough, full_address });
    setIsOpen(true);
  };
    return (
        <div className="map-wrapper">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
        mapContainerClassName="map-container"
          center={center}
          zoom={zoom}
          onClick={() => setIsOpen(false)}
        >
          <div>
          { posts.length > 0 && posts.map((post: SubmitData) => {
            if (!post.coordinates.lat || !post.coordinates.lng) return 
            return(
              <MarkerF 
                key={post._id} 
                position={{ lat: Number(post.coordinates.lat), lng: Number(post.coordinates.lng) }}
                onClick={() => handleMarkerClick(post._id, post.name, post.borough, post.full_address)}
                >
                  { isOpen && infoWindowData.id === post._id && (
                    <InfoWindow 
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                    >
                      <div className="info-window">
                        <h3>{infoWindowData.name}</h3>
                        <span>{infoWindowData.borough}</span>
                        <p>{infoWindowData.full_address ? infoWindowData.full_address : ''}</p>
                    </div>
                  </InfoWindow>
                  )}
              </MarkerF>
          )})}
          </div>
        </GoogleMap>
      )}
        </div>
    )
}
export default Map
