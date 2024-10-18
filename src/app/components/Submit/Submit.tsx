"use client"
import React, { FormEvent, ButtonHTMLAttributes, useState } from 'react'
import dynamic from 'next/dynamic'
import { SubmitData, SearchBoxRetrieveResponse } from '../../types/Types'
import beers from '../../beers.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons'
import Loader from '../Loader/Loader'

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
        date: null,
        newPub: '',
        isWeatherspoons: false,
        beerGarden: false,
        sports: false,
        happyHour: false
    })

    const retireve = (res: SearchBoxRetrieveResponse) => {
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
    const sortedBeers = beers.sort((a: string, b: string) => a.localeCompare(b))
    // Filtering duplicates
    const filteredDuplicates = sortedBeers.filter(
        (obj, index) =>
            sortedBeers.findIndex(
                (item) => item === obj && item === obj
            ) === index
    )

    const postData = async (e) => {
        e.preventDefault()
        e.preventDefault()
        try {
            console.log(e)
            if (!submitData.name || !submitData.price || !submitData.drink) return setErrorMessage('All fields are required.')
            console.log('submitData', submitData)
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
                    date: '',
                    newPub: '',
                    isWeatherspoons: false,
                    beerGarden: false,
                    sports: false,
                    happyHour: false
                })
            }
            setLoader(false)
            return setErrorMessage('We had trouble saving your post... Have a pint and let us sort it out!')
        } catch (e) {
            console.log('Error', e)
        }
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
                <h2>Submit a pint</h2>
                {/* <FontAwesomeIcon icon={faPlus} className={`${openMenu && 'rotate'}`} /> */}
            </div>
            <form>
                <label>
                    Search Pub:
                    <DynamicSearchBox
                        accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY || ''}
                        options={{
                            language: 'en',
                            country: 'GB',
                            poi_category: "",
                            limit: 10,
                        }}
                        placeholder={"Search..."}
                        value={submitData.name}
                        onChange={() => { }}
                        onRetrieve={retireve}
                    />
                </label>

                <label>Price:
                    <input placeholder='£0.00' max={20} maxLength={5} required className='submit-price input text-black' type="number" onChange={(e) => setSubmitData((prev) => ({ ...prev, price: e.target.value }))} />
                </label>
                <label>
                    Drink:
                    <select onChange={(e) => setSubmitData((prev) => ({ ...prev, drink: e.target.value }))} className='submit-drink input text-black' required>
                        <option value="" selected disabled>Select an drink</option>
                        {filteredDuplicates.length && filteredDuplicates.map((beer, index) => {
                            return <option key={beer + index} value={beer}>{beer}</option>
                        })}
                    </select>
                    {/* <label>
                        If your drink is not listed add it here:
                        <input type='text' className='submit-price input text-black' onChange={(e) => setSubmitData((prev) => ({ ...prev, newDrink: e.target.value }))} />
                    </label> */}
                </label>
                <p>Select any that apply</p>
                <label className='check-box-labels'>
                    <input type="checkbox" onChange={(e) => setSubmitData((prev) => ({ ...prev, isWeatherspoons: e.target.checked }))} />
                    Is this pub a Weatherspoons?
                </label>
                <label className='check-box-labels'>
                    <input type="checkbox" onChange={(e) => setSubmitData((prev) => ({ ...prev, beerGarden: e.target.checked }))} />
                    Beer Garden?
                </label>
                <label className='check-box-labels'>
                    <input type="checkbox" onChange={(e) => setSubmitData((prev) => ({ ...prev, sports: e.target.checked }))} />
                    Sports?
                </label>
                <label className='check-box-labels'>
                    <input type="checkbox" onChange={(e) => setSubmitData((prev) => ({ ...prev, happyHour: e.target.checked }))} />
                    Happy Hour?
                </label>
                <button className='btn blue' onClick={postData}>Submit</button>
                <div className='status'>
                    {loader && <p><Loader /></p>}
                    {!loader && errorMessage && (
                        <p className='error'>{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className='success'>{successMessage}! <FontAwesomeIcon icon={faCheck} style={{ color: "#07df5a" }} /></p>
                    )}
                </div>
            </form>
        </div>
    )
}
