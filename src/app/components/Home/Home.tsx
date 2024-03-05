"use client"
require('dotenv').config()
import { useRef, useState , useEffect} from 'react'
import React from 'react'
import Submit from '../Submit/Submit'
import { SubmitData } from '../../types/Types'
import Results from '../../components/Results/Results'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Filterbox from '../Filterbox/Filterbox'
import MapboxMap from '../MapboxMap/MapboxMap'
import sort from '../../utils/sort'


const defaultSortChoice = 'Newest'
const sortChoices = [
  { name: 'Newest' },
  { name: 'Price - Lowest' },
  { name: 'Price - Highest' },
  { name: 'Alphabetical - Pub' },
  { name: 'Alphabetical - Drink' }
]

export default function Home() {
    const [allResults, setAllResults] = useState<SubmitData[]>([])
    const [filteredResults, setFilteredResults] = useState<SubmitData[]>([])
    const [query] = useState<string>('')
    const [showMap, setShowMap] = useState<boolean>(false)
    const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
      const initialFetch = async () => {
        setIsLoading(true)
        const response = await fetch('/api')
        const posts: { status: number, data: SubmitData[] } = await response.json()
        const { data = [] }: { data: SubmitData[] } = posts
        console.log(data)
        if (data.length > 0) {
          const sortByNewest: SubmitData[] | [] = sort<SubmitData>(defaultSortChoice, data)
          setFilteredResults(sortByNewest)
          setAllResults(sortByNewest)
          return setIsLoading(false)
        }
      }
      initialFetch()
    }, []);

    // REF
    const filterRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
          if (filterRef.current && !filterRef.current.contains(e.target)) {
            setFilterMenuOpen(false)
          }
        }
        document.addEventListener("click", checkIfClickedOutside)
        return () => {
          document.removeEventListener("click", checkIfClickedOutside)
        }
      }, [filterMenuOpen])
    
    useEffect(() => {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "auto"
      }
    }, [])

    const handleFilterChange = (e: { target: { value: string }}) => {
        if (e.target.value === '') {
          return setFilteredResults(allResults)
        }
        const filter = filteredResults.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
        return setFilteredResults(filter)
    }

  return (
    <main>
        <div className='intro'>
            <h4><strong>BudgetBrews</strong> is here to help you find the most affordable pubs in town.</h4>
            <p>No signup required. Search and submit your local pub prices.</p>
            <p>Please be as accurate as possible when submitting data. Your contributions are vital to our success.</p>
            <a href='mailto:peterjameslewis4@hotmail.com'>Feedback</a>
            <a target="_blank" href='https://www.buymeacoffee.com/peterjamesr' >Buy me a beer <FontAwesomeIcon icon={faArrowRight} /></a>
        </div>
        <Submit setFilteredResults={setFilteredResults} />
        <div className='filter-bar'>
            <div className='display-style'>
                <h3 className={`change-display-text ${showMap ? '' : 'border'}`} onClick={() => setShowMap(false)} >List</h3>
                <h3 className={`change-display-text ${showMap ? 'border' : ''}`} onClick={() => setShowMap(true)}>Map</h3>
            </div>
            <div className='search'>
                <div className='search-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input placeholder='Search...' type="text" onChange={handleFilterChange} />
                <div className='filter-icon' ref={filterRef}  onClick={() => setFilterMenuOpen(true)} >
                  <FontAwesomeIcon icon={faSort} />
                </div>
            </div>
            <Filterbox 
              filterMenuOpen={filterMenuOpen}
              setFilterMenuOpen={setFilterMenuOpen}
              filteredResults={filteredResults}
              setFilteredResults={setFilteredResults}
              defaultSortChoice={defaultSortChoice}
              sortChoices={sortChoices}
              />
        </div>
        { showMap ? 
          <MapboxMap filteredResults={filteredResults} />
         : 
         <Results 
          posts={filteredResults} 
          query={query} 
          isLoading={isLoading}
          /> 
        }
    </main>
  )
}
