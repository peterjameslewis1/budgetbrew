import { SubmitData } from '@/app/types/Types'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import sortResults from '../../utils/sort'
import FilterboxItem from './FilterboxItem'

type FilterboxProps = {
    filterMenuOpen: boolean, 
    filteredResults: SubmitData[], 
    setFilterMenuOpen: Function, 
    setFilteredResults: Function,
    defaultSortChoice: string,
    sortChoices: { name: string}[]
}
const sortChoices = [
    { name: 'Newest' },
    { name: 'Price - Lowest' },
    { name: 'Price - Highest' },
    { name: 'Alphabetical - Pub' },
    { name: 'Alphabetical - Drink' }
];

type sortChoicesTypes = {
    name: string
}

export default function Filterbox({ filterMenuOpen, filteredResults, setFilterMenuOpen, setFilteredResults, defaultSortChoice, sortChoices }: FilterboxProps) {
    const [sortSelection, setSortSelection] = useState<string>(defaultSortChoice)
    // const [filterSelection, setFilterSelection] = useState<string>('')

    // Handles selections of the sort and filter function
    const handleSortAndFilter = (e: React.MouseEvent<HTMLLIElement>, setterFunction: Function): void => {
        const selection = (e.target as HTMLLIElement).innerHTML
        if (sortSelection === selection) {
            setFilteredResults(sortResults<SubmitData>(defaultSortChoice, filteredResults))
            return setterFunction(defaultSortChoice)
        }
        setFilteredResults(sortResults<SubmitData>(selection, filteredResults))
        return setterFunction(selection)
    }
  return (
    <div className={filterMenuOpen ? `filter-box` : 'display-none'}>
            <div className='close-filterbox' onClick={() => setFilterMenuOpen(false)}><FontAwesomeIcon icon={faXmark} /></div>
            <div className='sort'>
                <h3>Sort:</h3>
                <ul>
                { sortChoices.map((input: sortChoicesTypes, index: number) => {
                    return (
                        <FilterboxItem
                            key={`${input.name}-${index}`}
                            name={input.name}
                            index={index}
                            sortSelection={sortSelection}
                            handleSortAndFilter={handleSortAndFilter}
                            stateSetter={setSortSelection}
                        />
                    )
                })}
                </ul>
            </div>
            <div className='filter'>
                <h3>Filter:</h3>
                <ul>
                    <li className={sortSelection === 'Hide Weatherspoons' ? 'active-filter' : ''} onClick={(event) => handleSortAndFilter(event, setSortSelection)}>
                        Hide Weatherspoons
                    </li>
                </ul>
            </div>
        </div>
  )
}
