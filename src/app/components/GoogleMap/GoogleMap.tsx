import { useState } from "react";
import { SubmitData } from "@/app/types/Types";
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

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
  price: string;
}

const Map = ({ posts = [], center = {lat: 51.499670, lng: -0.137480}, zoom = 10, googleMapsApiKey = '' }: GoogleMapProps) => {
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData>({ id: '', name: '', borough: '', full_address: '', price: '' });
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey
  });
if (googleMapsApiKey === '') {
   return <div>Error</div>;
  }
  const handleMarkerClick = ({ id, name, borough, full_address, price}: InfoWindowData) => {
    setInfoWindowData({ id, name, borough, full_address, price });
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
                onClick={() => handleMarkerClick({ 
                  id: post._id, 
                  name: post.name, 
                  borough: post.borough, 
                  full_address: post.full_address, 
                  price: post.price 
                })}
                >
                  { isOpen && infoWindowData.id === post._id && (
                    <InfoWindow 
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                    >
                      <div className="info-window">
                        <div className="title">
                        <h3>{infoWindowData.name}</h3>
                        <span>£{infoWindowData.price}</span>
                        </div>
                        <span><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{infoWindowData.borough}</span>
                        <p>{infoWindowData.full_address ? infoWindowData.full_address : ''}</p>
                        { post.name && <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${post.name.replace(' ', '+')}`} className='directions'>Directions</Link>}
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
