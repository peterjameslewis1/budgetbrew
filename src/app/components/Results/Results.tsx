"use client"
import { SubmitData } from '@/app/types/Types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Link from 'next/link'
// import getGeoLocation from '@/app/functions/getGeoLocation'

export default function Results({ posts, query = '' }: { posts: SubmitData[], query: string }) {
  const [noPosts, setNoPosts] = useState<boolean>(false)
  // const [coords, setCoords] = useState<object>()
  const showNoResultsTimer = setTimeout(() => setNoPosts(true), 5000);

  // useEffect(() => {
  //   const successCallback = (res: { coords: object }) => 'coords' in res ? setCoords(res.coords) : null
  //   const errorCallback = (err: object) => console.log('error', err)
  //   navigator.geolocation.watchPosition(successCallback, errorCallback)
  //   const getDistance = async () => {
  //     const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/%2C51.485756%3B-0.210877%2C51.486452?alternatives=false&geometries=geojson&overview=simplified&steps=false&access_token=pk.eyJ1IjoicGV0ZXJqYW1lc2xld2lzIiwiYSI6ImNsbWpiNjQ2ZTAyMjYya21wMHBqeWNtbzkifQ.AWfGNpaZZ9K1JpfP0fuNQQ`)
  //     console.log('res', res)
  //   }
  //   getDistance()
  // }, [coords, setCoords]);

  return (
    <div className='results'>
      { !posts.length && query === '' && noPosts && <h2>No posts</h2>}
      { !posts.length && query === '' && !noPosts && <h2>Loading...</h2>}
      { !posts.length && query !== '' && <h2>No posts match your query</h2>}
        <ul className='pubs'>
        { posts.length > 0 && posts.map((pub) => {
          const { borough, drink, price, address, name, _id } = pub
          
          return <li key={_id} className='pub-wrapper'>
            <div className='pub'>
              <div className='name-location'>
              <h2 className='name'>{name}</h2>
              <p className='borough'><FontAwesomeIcon icon={faLocationPin} />{borough ? borough : address}</p>
              </div>
              { name && 
                <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${pub.name.replace(' ', '+')}`} className='directions'>
                  <FontAwesomeIcon icon={faLocationDot} />
                </Link>
              }
            </div>
            <div className='price'>
              <h3 className='drink'>{drink}</h3>
              <span>£{price}</span>
            </div>
          </li>
        })}
        </ul>
    </div>
  )
}
