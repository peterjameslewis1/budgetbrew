"use client"
import { useCallback, useRef, useState , useEffect} from 'react'
import React from 'react'
import Submit from '../Submit/Submit'
import { SubmitData } from '../../types/Types'
import Results from '../../components/Results/Results'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import Filterbox from '../Filterbox/Filterbox'

export default function Home() {
    const [allPosts, setAllPosts] = useState<SubmitData[]>([])
    const [filteredPosts, setFilteredPosts] = useState<SubmitData[]>(allPosts)
    const [query, setQuery] = useState<string>('')
    const [displayedResult, setDisplayedResult] = useState<boolean>(true)
    const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const sortResults = useCallback((text: string, data = []) => {
      if (text === 'Price - Highest') {
          return setFilteredPosts(data.sort((a: any, b: any) => Number(b.price) - Number(a.price)))
      } else if (text === 'Price - Lowest') {
          return setFilteredPosts(data.sort((a: any, b: any) => Number(a.price) - Number(b.price)))
      } else if (text === 'Alphabetical - Pub') {
        return setFilteredPosts(data.sort((a: any, b: any) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        }))
      } else if (text === 'Alphabetical - Drink') {
        return setFilteredPosts(data.sort((a: any, b: any) => {
          if (a.drink < b.drink) return -1
          if (a.drink > b.drink) return 1
          return 0
      }))} else if (text === 'Newest') {
        let dataWithDates = data.filter((x: SubmitData) => x.date && new Date(x.date) instanceof Date)
        const restWithoutData = data.filter((x: SubmitData) => !x.date)
        dataWithDates.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        return setFilteredPosts([ ...dataWithDates, ...restWithoutData ])
      } else if (text === 'Hide Weatherspoons') {
        return setFilteredPosts(data.filter((pub: SubmitData) => !pub.name.toLowerCase().includes('weatherspoon')))
      }
      
  },[])

    useEffect(() => {
      const initialFetch = async () => {
        setIsLoading(true)
        const response = await fetch('/api')
        const posts: { status: number, data: SubmitData[] } = await response.json()
        const { data } = posts
        if (data.length > 0) {
          sortResults('Price - Lowest', data)
          setAllPosts(data)
          return setIsLoading(false)
        }
      }
      initialFetch()
    }, [sortResults]);

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
            return setFilteredPosts(allPosts)
          }
          const filter = allPosts.filter((post) => post.name.toLowerCase().includes(e.target.value.toLowerCase()))
          return setFilteredPosts(filter)
      }

  return (
    <main>
        <div className='intro'>
            <h4><strong>BudgetBrews</strong> is here to help you find the most affordable pubs in town.</h4>
            <p>No signup required. Search and submit your local pub prices.</p>
            {/* <a target="_blank" href='https://www.buymeacoffee.com/peterjamesr' >Buy me a beer <FontAwesomeIcon icon={faArrowRight} /></a> */}
        </div>
        <Submit setAllPosts={setAllPosts} />
        <div className='filter-bar'>
            <div className='display-style'>
                <h3 className={`change-display-text ${displayedResult ? 'border' : ''}`} onClick={() => setDisplayedResult(true)} >List</h3>
                <h3 className={`change-display-text ${displayedResult ? '' : 'border'}`} onClick={() => setDisplayedResult(false)}>Map</h3>
            </div>
            <div className='search'>
                <div className='search-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input placeholder='Search...' type="text" onChange={handleFilterChange} />
                <div className='filter-icon' ref={filterRef}>
                    <FontAwesomeIcon icon={faSort} onClick={() => setFilterMenuOpen((prev) => !prev)} />
                    { filterMenuOpen && <Filterbox 
                      filterMenuOpen={filterMenuOpen} 
                      filteredPosts={filteredPosts}
                      sortResults={sortResults}
                      setFilterMenuOpen={setFilterMenuOpen}
                      /> 
                    }
                </div>
            </div>
        </div>
        { displayedResult ? 
        <Results 
          posts={filteredPosts} 
          query={query} 
          isLoading={isLoading}
          /> 
         : 
        <GoogleMap 
          posts={filteredPosts}
          center={{lat: 51.499670, lng: -0.137480}}
          zoom={10}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} 
          /> }
    </main>
  )
}
