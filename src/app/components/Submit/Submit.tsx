"use client"
import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { SubmitData, SearchBoxRetrieveResponse } from '../../types/Types'
import beers from '../../beers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faCheck } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader'
type Beers = {
    label: string;
    value: string
}

const DynamicSearchBox = dynamic(() => import('../SearchBox/SearchBoxInput'), {
    ssr: false,
  })
  

export default function Submit({ setFilteredResults }: { setFilteredResults: Function }) {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [loader, setLoader] = useState<boolean>(false)
    const [submitData, setSubmitData] = useState<SubmitData>({
        _id: '',
        name: '',
        price: '',
        drink: '',
        full_address: '',
        address: '',
        borough: '',
        coordinates: {
            lat: 0,
            lng: 0
        },
        type: '',
        mapbox_id: '',
        date: ''
    })

    const retireve  = (res: SearchBoxRetrieveResponse ) => {
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
                mapbox_id,
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
    if (!submitData.name || !submitData.price || !submitData.drink) return setErrorMessage('All fields are required.')
    priceValidation(submitData.price)
    if (!!errorMessage) return
    setLoader(true)
    const response = await fetch('/api', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ ...submitData, date: Date.now() })
    })
    const { data, status }: { data: SubmitData[], status: number } = await response.json()
    if (status === 200) {
        setLoader(false)
        setErrorMessage('')
        setSuccessMessage('Saved!')
        setFilteredResults(data)
        return setSubmitData({
            _id: '',
            name: '',
            price: '',
            drink: '',
            full_address: '',
            address: '',
            borough: '',
            coordinates: {
                lat: 0,
                lng: 0
            },
            type: '',
            mapbox_id: '',
            date: ''
        })
    }
    setLoader(false)
    return setErrorMessage('We had trouble saving your post... Have a pint and let us sort it out!')
  }
  const openCloseMenu = (setTo: boolean) => {
    setOpenMenu(setTo)
    setLoader(false)
    setSuccessMessage('')
    return setErrorMessage('')
  }

  const priceValidation = (price: string) => {
    if (price.includes('£')) price.replace('£', '')
    const value = Number(price)
    if (value > 20) return setErrorMessage('Price must be £20 or below')
    return setErrorMessage('')
  }
  return (
    <div className={`submit ${openMenu ? 'open-menu' : ''} `}>
        <div className={`dropdown ${openMenu ? 'open-menu' : ''} `} onClick={() => openCloseMenu(!openMenu)}>
        <h2>Submit a drink</h2>
        <FontAwesomeIcon icon={faPlus} className={`${openMenu && 'rotate'}`} />
        </div>
        <form>
            <label>Search Pub*</label>
            <DynamicSearchBox 
                accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY || ''}
                options={{
                    language: 'en',
                    country: 'GB',
                    poi_category: "pub,bar,nightlife",
                    limit: 10,
                }}
                placeholder={"Search..."}
                value={submitData.name}
                onChange={() => {}}
                onRetrieve={retireve}
                />
        <label className='is-weatherspoons-label'>Is this pub a Weatherspoons: </label>
        <input type="checkbox" onChange={(e) => setSubmitData((prev) => ({ ...prev, isWeatherspoons: e.target.checked }))} />
        <label>Price*</label>
        <input placeholder='0.00' max={20} maxLength={5} required className='submit-price input text-black' type="number" onChange={(e) => setSubmitData((prev) => ({ ...prev, price: e.target.value }))} />
        <label>Drink*</label>
        <select onChange={(e) => setSubmitData((prev) => ({ ...prev, drink: e.target.value }) )} defaultValue={filteredDuplicates[0].label} className='submit-drink input text-black' required>
            <option value="none" selected disabled hidden>Select an drink</option> 
            { filteredDuplicates.length && filteredDuplicates.map((beer) => {
                return <option key={beer.label} value={beer.label}>{beer.label}</option>
            })}
        </select>
        <button className='btn blue' onClick={postData}>Submit</button>
        <div className='status'>
            { loader && <p><Loader /></p>}
            { !loader && errorMessage && (
                <p className='error'>{errorMessage}</p>
            )}
            { successMessage && (
                <p className='success'>{successMessage}! <FontAwesomeIcon icon={faCheck} style={{color: "#07df5a"}} /></p>
            )}
        </div>
        </form>
    </div>
  )
}
