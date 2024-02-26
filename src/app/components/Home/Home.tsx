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

export default function Home() {
    const [allResults, setAllResults] = useState<SubmitData[]>([])
    const [filteredResults, setFilteredResults] = useState<SubmitData[]>([])
    const [query, setQuery] = useState<string>('')
    const [showMap, setShowMap] = useState<boolean>(false)
    const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
      const initialFetch = async () => {
        setIsLoading(true)
        const response = await fetch('/api')
        const posts: { status: number, data: SubmitData[] } = await response.json()
        const { data }: { data: SubmitData[] } = posts
        console.log(data)
        if (data.length > 0) {
          sort<SubmitData>('Newest', data)
          setAllResults(data)
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
          const filter = allResults.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
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
        <Submit setAllResults={setAllResults} />
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
                <div className='filter-icon' ref={filterRef}  onClick={() => setFilterMenuOpen((prev) => !prev)} >
                    <FontAwesomeIcon icon={faSort} />
                    { filterMenuOpen && <Filterbox 
                      filterMenuOpen={filterMenuOpen} 
                      filteredResults={filteredResults}
                      setFilterMenuOpen={setFilterMenuOpen}
                      /> 
                    }
                </div>
            </div>
        </div>
        { showMap && !!filteredResults.length ? 
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
