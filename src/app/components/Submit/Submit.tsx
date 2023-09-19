"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { SearchBox } from '@mapbox/search-js-react';
import { SubmitData } from '../../types/Types'
import beers from '../../beers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
type Beers = {
    label: string;
    value: string
}

export default function Submit({ setPosts }: { setPosts: () => {} }) {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [submitData, setSubmitData] = useState({
        name: '',
        price: '',
        drink: '',
        full_address: '',
        address: '',
        borough: '',
        coordinates: {
            lat: '',
            lon: ''
        },
        type: '',
        mapbox_id: '',
        date: new Date()
    })

    const retireve  = (data: { features: {}[] }) => {
        if ('features' in data) {
            const { properties }: { properties: SubmitData } = data.features[0]
            console.log('data.features[0', data.features[0])
            const { name, full_address, coordinates, address, maki, context, mapbox_id } = properties
            setSubmitData({
                ...submitData,
                name,
                full_address,
                address,
                borough: context?.locality?.name,
                coordinates: {
                    lat: coordinates.latitude,
                    lon: coordinates.longitude
                },
                type: maki,
                date: new Date(),
                mapbox_id
            })
        } 
    }
    // sorting alphabetically
    const sortedBeers = beers.sort((a:Beers, b:Beers) => a.label.localeCompare(b.label))
    // Filtering duplicates
    const filteredDuplicates = sortedBeers.filter(
    (obj, index) =>
    sortedBeers.findIndex(
        (item) => item.label === obj.label && item.value === obj.value
      ) === index
  )

  const postData = async () => {
    const response = await fetch('/api', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(submitData)
    })
    const posts: { data: SubmitData[], status: number } = await response.json()
    if (posts.status === 200) {
        setOpenMenu(false)
        setPosts(posts.data)
        return setSubmitData({
            name: '',
            price: '',
            drink: '',
            full_address: '',
            address: '',
            borough: '',
            coordinates: {
                lat: '',
                lon: ''
            },
            type: '',
            mapbox_id: '',
            date: new Date()
        })
    }
  }
  return (
    <div className={`submit ${openMenu ? 'open-menu' : ''} `}>
        <div className='dropdown' onClick={() => setOpenMenu(!openMenu)}>
        <h2>Submit a drink</h2>
        <FontAwesomeIcon icon={faPlus} />
        </div>
        <form>
            <label>Search Pub:</label>
            <SearchBox 
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            options={{
                language: 'en',
                country: 'GB',
                poi_category: ["pub", "bar"],
                limit: 10,
            }}
            placeholder="Search..."
            value={submitData.name}
            onChange={() => setSubmitData((prev) => ({ ...prev, name: submitData.name }) )}
            onRetrieve={retireve}
        />
        <label>Price:</label>
        <input placeholder='£ 0' required className='submit-price input' type="text" value={submitData.price} onChange={(e) => setSubmitData((prev) => ({ ...prev, price: e.target.value }) )} />
        <label>Drink:</label>
        <select onChange={(e) => setSubmitData((prev) => ({ ...prev, drink: e.target.value }) )} defaultValue={'Select drink...'} className='submit-drink input' name="lager">
            <option>Select drink...</option>
            { filteredDuplicates.length && filteredDuplicates.map((beer) => {
                return <option key={beer.label} value={beer.label}>{beer.label}</option>
            })}
        </select>
        <button className='btn blue' type="button" onClick={postData}>Submit</button>
        </form>
    </div>
  )
}
