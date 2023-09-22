"use client"
import { SubmitData } from '@/app/types/Types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import getGeoLocation from '@/app/functions/getGeoLocation'

export default function Results({ posts, query = '' }: { posts: SubmitData[], query: string }) {
  const [noPosts, setNoPosts] = useState<boolean>(false)
  const [coords, setCoords] = useState<object>()
  const showNoResultsTimer = setTimeout(() => setNoPosts(true), 5000);

  useEffect(() => {
    const coordinates = getGeoLocation()
    if ('latitude' in coordinates) return setCoords(coordinates)
  }, []);
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
              <Link href={`https://www.google.com/maps/place/${pub.name.replace(' ', '+')}`} className='directions'>
              <FontAwesomeIcon icon={faLocationDot} />
              </Link>
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
