"use client"
import { useCallback, useRef, useState , useEffect} from 'react'
import React from 'react'
import Submit from '../Submit/Submit'
import { SubmitData } from '../../types/Types'
import Results from '../../components/Results/Results'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

export default function Home() {
    const [allPosts, setAllPosts] = useState<SubmitData[]>([])
    const [query, setQuery] = useState<string>('')
    const [displayedResult, setDisplayedResult] = useState<boolean>(true)
    const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false)

    useEffect(() => {
      const initialFetch = async () => {
        const response = await fetch('/api')
        const posts = await response.json()
        const { data }: { status: number, data: SubmitData[] } = posts
        if (data.length > 0) return setAllPosts(data)
      }
      initialFetch()
    }, []);

    // REF
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
          if (ref.current && !ref.current.contains(e.target)) {
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
        if (query !== '') {
        setQuery(e.target.value)
        const filter = allPosts.filter((post) => post.name.toLowerCase().includes(query.toLowerCase()))
        return setAllPosts(filter)
        }
        return setAllPosts(posts)
    }

    const sortResults = useCallback((text: string) => {
        if (text === 'Price - Highest') {
            setFilterMenuOpen(false)
            return setAllPosts(allPosts.sort((a, b) => Number(b.price) - Number(a.price)))
        } else if (text === 'Price - Lowest') {
            setFilterMenuOpen(false)
            return setAllPosts(allPosts.sort((a, b) => Number(a.price) - Number(b.price)))
        }
        setFilterMenuOpen(false)
        return setAllPosts(allPosts.sort((a: any, b: any) => {
            if (a.drink < b.drink) return -1
            if (a.drink > b.drink) return 1
            return 0
    }))
    },[allPosts])
  return (
    <main>
        <div className='intro'>
            <h4><strong>BudgetBrews</strong> is here to help you find the most affordable pubs in town.</h4>
            <p>No signup required. Search and submit your local pub prices.</p>
        </div>
        <Submit setPosts={setAllPosts} />
        <div className='filter-bar'>
            <div className='display-style'>
                <h3 className={`change-display-text ${displayedResult ? 'border' : ''}`} onClick={() => setDisplayedResult(true)} >List</h3>
                <h3 className={`change-display-text ${displayedResult ? '' : 'border'}`} onClick={() => setDisplayedResult(false)}>Map</h3>
            </div>
            <div className='search'>
                <div className='search-icon'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input placeholder='Search...' type="text" value={query} onChange={handleFilterChange} />
                <div className='filter-icon' ref={ref}>
                    <FontAwesomeIcon icon={faFilter} onClick={() => setFilterMenuOpen((prev) => !prev)} />
                    <div className={`filter-box ${filterMenuOpen ? '' : 'display-none'}`}>
                    <span onClick={(e) => sortResults('Price - Highest')}>{`Price - Highest`}</span>
                    <span onClick={(e) => sortResults('Price - Lowest')}>{`Price - Lowest`}</span>
                    <span onClick={(e) => sortResults('Alphabetical')}>Alphabetical</span>
                </div>
                </div>
            </div>
        </div>
        { displayedResult ? 
        <Results 
          posts={allPosts} 
          query={query} /> 
         : 
        <GoogleMap 
          posts={allPosts}
          center={{lat: 51.499670, lng: -0.137480}}
          zoom={10}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} 
          /> }
    </main>
  )
}
