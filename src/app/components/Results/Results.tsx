"use client"
import { SubmitData } from '@/app/types/Types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import moment from 'moment';

export default function Results({ posts, query = '', isLoading }: { posts: SubmitData[], query: string, isLoading: boolean }) {
  return (
    <div className='results'>
      { !posts.length && query === '' && isLoading && <h2>Loading...</h2>}
      { !posts.length && query === '' && !isLoading && <h2>No posts</h2>}
      { !posts.length && query !== '' && <h2>No posts match your query</h2>}
      { posts.length > 0 && <div className='number-of-results'><p>{posts.length} results</p></div> }
        <ul className='pubs'>
        { posts.length > 0 && posts.map((pub) => {
          const postDate = pub.date ? moment(pub.date).fromNow() : ''
          const { borough, drink, price, address, name, _id } = pub
          
          return <li key={_id} className='pub-wrapper'>
            <div className='pub'>
              <div className='name-location'>
              <h2 className='name'>{name}</h2>
              <p className='borough'><FontAwesomeIcon id="location-pin" icon={faLocationPin} />{borough ? borough : address} - {postDate}</p>
              </div>
              { name && 
                <Link target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${pub.name.replace(' ', '+')}`} className='directions'>
                  <FontAwesomeIcon icon={faLocationDot} />
                </Link>
              }
            </div>
            <div className='price'>
              <h3 className='drink'>{drink}</h3>
              <span>£{price}</span>
            </div>
          </li>
        })}
        </ul>
    </div>
  )
}
