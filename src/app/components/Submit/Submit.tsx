"use client"
import React, { useState, useEffect } from 'react'
import { SearchBox } from '@mapbox/search-js-react';
import { writeData } from '../../api/route'
import beers from '../../beers'
type Beers = {
    label: string;
    value: string
}
export default function Submit() {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [drink, setDrink] = useState<string>('');

    const submitDrink = () => {
        if (name && drink && price) writeData({ name, drink, price })
    }

    const setterFunction = (value: string, setter: Function) => setter(value)
const retireve  = (data) => console.log(data)
// sorting alphabetically
const sortedBeers = beers.sort((a:Beers, b:Beers) => a.label.localeCompare(b.label))
// Filtering duplicates
const filteredDuplicates = sortedBeers.filter(
    (obj, index) =>
    sortedBeers.findIndex(
        (item) => item.label === obj.label && item.value === obj.value
      ) === index
  )
  return (
    <div className='submit'>
        <h2>Submit a drink</h2>
        <form>
            <label>Search Pub:</label>
            <SearchBox 
            accessToken={process.env.MAPBOX_API_KEY}
            options={{
                language: 'en',
                country: 'GB',
                poi_category: ["pub", "bar"]
            }}
            placeholder="Search..."
            value={name}
            onChange={setName}
            onRetrieve={retireve}
            required
        />
        <label>Price:</label>
        <input placeholder='£' required className='price' type="text" value={price} onChange={(e) => setPrice(() => e.target.value)} />
        <label>Drink:</label>
        <select onChange={(e) => setDrink(() => e.target.value)} defaultValue={'Select drink...'} className='drink' name="lager">
            <option>Select drink...</option>
            { filteredDuplicates.length && filteredDuplicates.map((beer) => {
                return <option key={beer.label} value={beer.label}>{beer.label}</option>
            })}
        </select>
        <button className='btn blue' onClick={submitDrink}>Submit</button>
        </form>
    </div>
  )
}
