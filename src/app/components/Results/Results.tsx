"use client"
import React, { useEffect, useState, useRef } from 'react';
import { SubmitData } from '@/app/types/Types'
import moment from 'moment';
import Result from './Result/Result'
import LoadingSkeleton from './Result/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faSort, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Filterbox from '../Filterbox/Filterbox';
import Submit from '../Submit/Submit';
import MapboxMap from '../MapboxMap/MapboxMap';



const defaultSortChoice = 'Newest'
const sortChoices = [
  { name: 'Newest' },
  { name: 'Price - Lowest' },
  { name: 'Price - Highest' },
  { name: 'Alphabetical - Pub' },
  { name: 'Alphabetical - Drink' }
]

export default function Results({ posts = [] }: { posts: SubmitData[] }) {
  const [allResults, setAllResults] = useState<SubmitData[]>(posts)
  const [filteredResults, setFilteredResults] = useState<SubmitData[]>(posts)
  const [showMap, setShowMap] = useState<boolean>(false)
  const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false)


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

  if (filteredResults.length === 0) {
    return <div className='results'><LoadingSkeleton /></div>
  }

  return (
    <>
      <Submit setFilteredResults={setFilteredResults} />
      { showMap ? 
      <MapboxMap filteredResults={filteredResults} />
      :
      <div className='results'>
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

        {/* { !posts.length && query === '' && isLoading && <h2>Loading...</h2>}
        { !posts.length && query === '' && !isLoading && <h2>No posts</h2>}
        { !posts.length && query !== '' && <h2>No posts match your query</h2>}
        { posts.length > 0 && <div className='number-of-results'><p>{posts.length} results</p></div> } */}
        {/* <div className='remove-weatherspoons'>
          <label>Hide Weatherspoons
            <input type="checkbox" onChange={(e) => setHideSpoons(e.target.checked)} />
          </label>
        </div> */}
          <ul className='pubs'>
          { posts.length > 0 && posts.map((pub) => {
            const postDate = pub.date ? moment(pub.date).fromNow() : ''
            const { borough, drink, price, full_address, address, name, _id } = pub
            return (
              <Result
                key={_id}
                name={name}
                full_address={full_address}
                address={address}
                price={price}
                drink={drink}
                borough={borough}
                postDate={postDate}
                />
          )})}
          </ul>
      </div>
      }
    </>
  )
}
