"use client"
require('dotenv').config()
const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
import React, { useState, useMemo } from 'react';
import Map, {Marker, Popup} from 'react-map-gl';
import Pin from '../Pin/Pin'
import { SubmitData } from '@/app/types/Types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const MapboxMap: React.FC<{ filteredResults: SubmitData[] }> = ({ filteredResults }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [popupInfo, setPopupInfo] = useState<SubmitData>()

  const pins = useMemo(() => {
    return filteredResults.map((result: SubmitData) => {
      return (
        <Marker 
        key={result._id} 
        longitude={Number(result.coordinates.lng)} 
        latitude={Number(result.coordinates.lat)} 
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(result);
          setShowPopup(true)
        }}
        >
        <Pin />
       </Marker>
      )
    })
  },[filteredResults])
  return (
    <Map
      mapboxAccessToken={apiKey}
      initialViewState={{
        latitude: 53,
        longitude: -1.66,
        zoom: 5,
        bearing: 0,
        pitch: 0
      }}
      style={{width: '100%', height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
       {pins}
       {showPopup && popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinates.lng)}
            latitude={Number(popupInfo.coordinates.lat)}
            onClose={() => setShowPopup(false)}
          >
                                  <div className="info-window">
                        <div className="title">
                        <h3>{popupInfo.name}</h3>
                        <span>£{popupInfo.price}</span>
                        </div>
                        <p><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{popupInfo.full_address ? popupInfo.full_address : ''}</p>
                        { popupInfo.name && <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${popupInfo.name.replace(' ', '+')},${popupInfo.full_address}`} className='directions'>Directions</Link>}
                    </div>
          </Popup>
        )}
    </Map>
  );
}

export default MapboxMap