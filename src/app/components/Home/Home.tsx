"use client"
import { useState } from 'react'
import React from 'react'
import Submit from '../Submit/Submit'
import { SubmitData } from '../../types/Types'
import Results from '../../components/Results/Results'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

export default function Home({ posts = [] }: { posts: SubmitData[] }) {
    const [allPosts, setAllPosts] = useState<SubmitData[]>(posts)
    const [filteredPosts, setFilteredPosts] = useState<SubmitData[]>(posts)
    const [error, setError] = useState<{}>({})
    const [query, setQuery] = useState<string>('')
    const [displayedResult, setDisplayedResult] = useState<boolean>(true)
    
    const handleFilterChange = (e: { target: { value: string }}) => {
        setQuery(e.target.value)
        if (query === '') return null
        const filter = allPosts.filter((post) => post.name.toLowerCase().includes(query.toLowerCase()))
        return setFilteredPosts(filter)
    }
  return (
    <div>
                <div className='intro'>
        <h4><strong>BudgetBrews</strong> is here to help you find the most affordable pubs in town.</h4>
        <p>No signup required. Search and submit your local pub prices.</p>
        </div>
        <Submit setPosts={setAllPosts} setFilteredPosts={setFilteredPosts} />
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
          <div className='filter-icon'>
          <FontAwesomeIcon icon={faFilter} />
          </div>
        </div>
        </div>
        { displayedResult ? 
        <Results 
          posts={filteredPosts} 
          query={query} /> 
         : 
        <GoogleMap 
          posts={filteredPosts}
          center={{lat: 51.499670, lng: -0.137480}}
          zoom={10}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} 
          /> }
    </div>
  )
}
