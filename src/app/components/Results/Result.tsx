import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faLocationDot } from '@fortawesome/free-solid-svg-icons'
type Props = {
    name: string;
    borough: string;
    full_address: string;
    price: string;
    drink: string;
    postDate: string;
}
export default function Result( { name, borough, full_address, drink, price, postDate = '', coordinates }: Props) {

  return (
    <li className='pub-wrapper'>
            <div className='pub'>
              <div className='name-location'>
              <h2 className='name'>{name}</h2>
              <p className='borough'><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{borough ? borough : full_address} - {postDate}</p>
              </div>
              { name && 
                <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${name.replace(' ', '+')},${full_address}`} className='directions'>
                  <FontAwesomeIcon icon={faLocationDot} />
                </Link>
              }
            </div>
            <div className='price'>
              <h3 className='drink'>{drink}</h3>
              <span>£{price}</span>
            </div>
          </li>
  )
}
