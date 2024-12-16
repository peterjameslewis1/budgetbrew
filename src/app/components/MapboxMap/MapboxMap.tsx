"use client"
require('dotenv').config()
const apiKey = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
import React, { useState, useMemo } from 'react';
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl';
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
      console.log('result.coordinates.latitude', result.coordinates.latitude)
      return (
        <Marker
          key={result._id}
          longitude={result.coordinates.longitude}
          latitude={result.coordinates.latitude}
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
  }, [filteredResults])
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
      style={{ width: '100%', height: 600, marginTop: '10px' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <GeolocateControl position="top-left" />
      {pins}
      {showPopup && popupInfo && (
        <Popup
          anchor="top"
          longitude={popupInfo.coordinates.longitude}
          latitude={popupInfo.coordinates.latitude}
          onClose={() => setShowPopup(false)}
        >
          <div className="info-window text-[#252524]">
            <div className="title">
              <h2 className='font-bold text-lg'>{popupInfo.name}</h2>
              <span>£{popupInfo.price}</span>
            </div>
            <p><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{popupInfo.full_address ? popupInfo.address : popupInfo.full_address}</p>
            {popupInfo.drink && <div className='mt-3'><span className='text-xl p-'>{popupInfo.drink}</span></div>}
            {popupInfo.name && <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${popupInfo.name.replace(' ', '+')},${popupInfo.full_address}`} className='directions'>Directions</Link>}
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default MapboxMap