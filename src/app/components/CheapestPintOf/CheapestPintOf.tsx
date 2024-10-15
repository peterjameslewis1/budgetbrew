"use client"
import react, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import Link from 'next/link'
import beers from '../../beers.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'
import { SubmitData } from '@/app/types/Types';

interface CheapestPintOFProps {
  name: string;
  borough: string;
  full_address: string;
  address: string;
  price: string;
  drink: string;
  date?: Date | string;
}

const CheapestPintOf: React.FC = ({ results }: any): React.JSX.Element => {
  const [cheapest, setCheapest] = useState<CheapestPintOFProps>(null)
  const [error, setError] = useState<boolean>(false)
  // const { name, borough, full_address, address, drink, price } = cheapest

  const handleCheapestPint = (event: ChangeEvent<HTMLSelectElement>) => {
    setError(false)
    const drink = event.target.value
    const selected = results.filter((x) => x.drink === drink)
    if(selected.length === 0) return setError(true)
    const cheapestSelected = selected.reduce((acc, curVal) => {
      return acc?.price < curVal.price ? acc : curVal
    })
    setCheapest(cheapestSelected)
  }

  return (
    <div className='cheapest-pint-of'>
      <h2>Cheapest Pint Of:</h2>
      <div className='pub-wrapper'>
        <select onChange={handleCheapestPint} className='submit-drink input text-black' required>
          <option value="" selected disabled>Select an drink</option>
          {beers.map((beer) => {
            return <option key={beer} value={beer}>{beer}</option>
          })}
        </select>
        { error && <h2 className='error-message'>No submittions yet!</h2>}
        {cheapest && (
          <>
          <div className='pub'>
            <div className='name-location'>
              <h2 className='name'>{cheapest.name}</h2>
              <p className='borough'><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{cheapest.borough ? cheapest.borough : cheapest.address} - {cheapest.address}</p>
            </div>
            {cheapest.name &&
              <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${cheapest.name.replace(' ', '+')},${cheapest.full_address}`} className='directions'>
                Directions
                {/* <FontAwesomeIcon icon={faLocationPin} /> */}
              </Link>
            }
          </div>
          <div className='price'>
            <h3 className='drink'>{cheapest.drink}</h3>
            <span>£{cheapest.price}</span>
          </div>
          </>
        )}
      </div>
    </div >
  );
}

export default CheapestPintOf;