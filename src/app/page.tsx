"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import Header from './components/Header/Header'
import { SubmitData } from './types/Types'
import getData from './function/getData'
import Submit from './components/Submit/Submit'
import Results from './components/Results/Results'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'
import GoogleMap from './components/GoogleMap/GoogleMap'

export default function Home() {
  const [allPosts, setAllPosts] = useState<SubmitData[]>([])
  const [filteredPosts, setFilteredPosts] = useState<SubmitData[]>(allPosts)
  const [query, setQuery] = useState<string>('')
  const [displayedResult, setDisplayedResult] = useState<boolean>(true)

  useEffect(() => {
    if (allPosts.length > 0) return undefined
    const init = async () => {
      const posts = await getData()
      console.log("posts page.tsx", posts); 
      if (posts.status === 200) {
        setAllPosts(posts.data)
        return setFilteredPosts(posts.data)
      }
    }
    init()
  }, [allPosts]);

  const handleFilterChange = (e: { target: { value: string }}) => {
    setQuery(e.target.value)
    if (query === '') return null
    const filter = allPosts.filter((post) => post.name.toLowerCase().includes(query.toLowerCase()))
    return setFilteredPosts(filter)
  }
  console.log('allPosts', allPosts)
  console.log('filteredPosts', filteredPosts)
  return (
    <main className={styles.main}>
      <div className='content'>
        <Header />
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
    </main>
  )
}
