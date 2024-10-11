import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';

type ResultProps = {
  name: string;
  borough: string;
  full_address: string;
  address: string;
  price: string;
  drink: string;
  date?: Date | null;
}
export default function Result({ name, borough, full_address, address, drink, price, date }: ResultProps) {
  const postDate = date ? moment(date).fromNow() : ''
  return (
    <li className='pub-wrapper'>
      <div className='pub'>
        <div className='name-location'>
          <h2 className='name'>{name}</h2>
          <p className='borough'><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{borough ? borough : address} - {address}</p>
        </div>
        {name &&
          <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${name.replace(' ', '+')},${full_address}`} className='directions'>
            Directions
            {/* <FontAwesomeIcon icon={faLocationPin} /> */}
          </Link>
        }
      </div>
      <div className='price'>
        <h3 className='drink'>{drink}</h3>
        <span>£{price}</span>
      </div>
      <span>{postDate}</span>
    </li>
  )
}
