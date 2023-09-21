"use client"
import React, { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { SearchBoxRetrieveResponse, SubmitData } from '../../types/Types'
// import beers from '../../beers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
type Beers = {
    label: string;
    value: string
}

const DynamicSearchBox = dynamic(() => import('../SearchBox/SearchBoxInput'), {
    ssr: false,
  })
  

export default function Submit({ setPosts }: { setPosts: Function }) {
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
            lng: ''
        },
        type: '',
        mapbox_id: '',
        date: new Date()
    })

    const retireve  = (res: any) => {
        console.log('retireve data', res)
        if ('features' in res) {
            const { name, full_address, coordinates, address, maki, context, mapbox_id } = res.features[0].properties
            setSubmitData({
                ...submitData,
                name,
                full_address,
                address,
                borough: context?.locality?.name,
                coordinates: {
                    lat: coordinates.latitude,
                    lng: coordinates.longitude
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
    const { data, status }: { data: SubmitData[], status: number } = await response.json()
    console.log('data', data)
    if (status === 200) {
        setOpenMenu(false)
        setPosts(data)
        return setSubmitData({
            name: '',
            price: '',
            drink: '',
            full_address: '',
            address: '',
            borough: '',
            coordinates: {
                lat: '',
                lng: ''
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
            <DynamicSearchBox 
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY || ''}
                options={{
                    language: 'en',
                    country: 'GB',
                    poi_category: "pub,bar",
                    limit: 10,
                }}
                placeholder={"Search..."}
                value={submitData.name}
                onChange={() => setSubmitData((prev) => ({ ...prev, name: submitData.name }) )}
                onRetrieve={retireve}
                />
        <label>Price:</label>
        <input placeholder='£ 0' required className='submit-price input' type="text" value={submitData.price} onChange={(e) => setSubmitData((prev) => ({ ...prev, price: e.target.value }) )} />
        <label>Drink:</label>
        {/* <select onChange={(e) => setSubmitData((prev) => ({ ...prev, drink: e.target.value }) )} defaultValue={'Select drink...'} className='submit-drink input' name="lager">
            <option>Select drink...</option>
            { filteredDuplicates.length && filteredDuplicates.map((beer) => {
                return <option key={beer.label} value={beer.label}>{beer.label}</option>
            })}
        </select> */}
        <button className='btn blue' type="button" onClick={postData}>Submit</button>
        </form>
    </div>
  )
}
