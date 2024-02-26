import { SubmitData } from '@/app/types/Types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import sort from '../../utils/sort'
const inputs = [
    { name: 'Newest' },
    { name: 'Price - Lowest' },
    { name: 'Price - Highest' },
    { name: 'Alphabetical - Pub' },
    { name: 'Alphabetical - Drink' }
]

export default function Filterbox({ filterMenuOpen, filteredResults, setFilterMenuOpen }: { filterMenuOpen: boolean, filteredResults: SubmitData[], setFilterMenuOpen: Function }) {
    const [checked, setChecked] = useState<string>('Price - Lowest')
  return (
    <div className={`filter-box ${filterMenuOpen ? '' : 'display-none'}`}>
        <div className='close-filterbox'onClick={() => setFilterMenuOpen((prev: boolean) => !prev)} ><FontAwesomeIcon icon={faXmark} /></div>
            <div className='sort'>
            <h3>Sort:</h3>
            <ul>
                { inputs.map((input, index) => {
                    return (
                        <li key={`${input.name}-${index}`} onClick={() => sort<SubmitData>(input.name, filteredResults)} >
                            <input id={input.name} checked={checked === input.name} className='filter-input' type="checkbox" value={input.name} onChange={(e) =>  {
                                return setChecked(input.name)
                            }} />
                            <label htmlFor={input.name} >{input.name}</label>
                        </li>
                    )
                })}
                </ul>
            </div>
            <div className='filter'>
                <h3>Filter:</h3>
                <input id='hide-weatherspoons' className='filter-input' type="checkbox" value={`Hide Weatherspoons`} onClick={(e) => sort<SubmitData>('Hide Weatherspoons', filteredResults)} />
                <label htmlFor='hide-weatherspoons' >Hide Weatherspoons</label>
            </div>
    </div>
  )
}
