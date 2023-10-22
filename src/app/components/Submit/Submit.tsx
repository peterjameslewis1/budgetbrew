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
  

export default function Submit({ setPosts }: { setPosts: Function }) {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [postStatusMessage, setPostStatusMessage] = useState<string>('')
    const [formError, setFormError] = useState<boolean>('')
    const [loader, setLoader] = useState<boolean>(false)
    const [submitData, setSubmitData] = useState({
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
        date: new Date()
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
    if (!submitData.name || !submitData.price || !submitData.drink) return setPostStatusMessage('All fields are required.')
    priceValidation(submitData.price)
    if (!!postStatusMessage || formError) return
    console.log('success')
    setLoader(true)
    const response = await fetch('/api', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(submitData)
    })
    const { data, status }: { data: SubmitData[], status: number } = await response.json()
    if (status === 200) {
        setLoader(false)
        setPostStatusMessage('Saved!')
        setPosts(data)
        return setSubmitData({
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
            date: new Date()
        })
    }
    setLoader(false)
    return setPostStatusMessage('We had trouble saving your post... Have a pint and let us sort it out!')
  }
  const openCloseMenu = (setTo: boolean) => {
    setOpenMenu(setTo)
    setLoader(false)
    return setPostStatusMessage('')
  }

  const priceValidation = (price: string) => {
    if (price.includes('£')) price.replace('£', '')
    const value = Number(price)
    // if (!value || value === 0) return setPostStatusMessage('Enter valid price')
    if (value > 20) return setPostStatusMessage('Price must be £20 or below')
    return setPostStatusMessage('')
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
        <label>Price*</label>
        <input placeholder='0.00' maxLength={5} required className='submit-price input' type="number" onChange={(e) => setSubmitData((prev) => ({ ...prev, price: e.target.value }))} />
        <label>Drink*</label>
        <select onChange={(e) => setSubmitData((prev) => ({ ...prev, drink: e.target.value }) )} defaultValue={'Select drink...'} className='submit-drink input' required>
            { filteredDuplicates.length && filteredDuplicates.map((beer) => {
                return <option key={beer.label} value={beer.label}>{beer.label}</option>
            })}
        </select>
        <button className='btn blue' type="button" onClick={postData}>Submit</button>
        <div className='status'>
            { loader && <p><Loader /></p>}
            { !loader && postStatusMessage && (
                <p className='error'>{postStatusMessage}</p>
            )}
            { postStatusMessage.toLowerCase().includes('saved') && (
                <p className='success'>{postStatusMessage}! <FontAwesomeIcon icon={faCheck} style={{color: "#07df5a"}} /></p>
            )}
        </div>
        </form>
    </div>
  )
}
