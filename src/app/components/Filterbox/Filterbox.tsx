import { SubmitData } from '@/app/types/Types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const inputs = [
    { name: 'Newest' },
    { name: 'Price - Lowest' },
    { name: 'Price - Highest' },
    { name: 'Alphabetical - Pub' },
    { name: 'Alphabetical - Drink' }
]

export default function Filterbox({ filterMenuOpen, filteredPosts, sortResults, setFilterMenuOpen }: { filterMenuOpen: boolean, filteredPosts: SubmitData[], sortResults: Function, setFilterMenuOpen: Function }) {
    const [checked, setChecked] = useState('Price - Lowest')
    console.log('checked', checked)
    console.log('checked', checked)
  return (
    <div className={`filter-box ${filterMenuOpen ? '' : 'display-none'}`}>
        <div className='close-filterbox'onClick={() => setFilterMenuOpen((prev: boolean) => !prev)} ><FontAwesomeIcon icon={faXmark} /></div>
            <div className='sort'>
            <h3>Sort:</h3>
                { inputs.map((input) => {
                    return (
                        <>
                            <input id={input.name} checked={checked === input.name} className='filter-input' type="checkbox" value={input.name} onChange={(e) =>  {
                                sortResults(input.name, filteredPosts)
                                return setChecked(input.name)
                            }} />
                            <label htmlFor={input.name} >{input.name}</label>
                        </>
                    )
                })}
            </div>
            <div className='filter'>
                <h3>Filter:</h3>
                <input id='hide-weatherspoons' className='filter-input' type="checkbox" value={`Hide Weatherspoons`} onClick={(e) => sortResults('Hide Weatherspoons', filteredPosts)} />
                <label htmlFor='hide-weatherspoons' >Hide Weatherspoons</label>
            </div>
    </div>
  )
}
