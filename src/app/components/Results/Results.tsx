"use client"
import { SubmitData } from '@/app/types/Types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'

export default function Results({ posts, query = '' }: { posts: SubmitData[], query: string }) {
  console.log('posts',posts)
  return (
    <div className='results'>
      { !posts.length && query === '' && <h2>Loading...</h2>}
      { !posts.length && query !== '' && <h2>No posts match your query</h2>}
        <ul className='pubs'>
        { posts.length && posts.map((pub) => {
          const { borough, drink, price, address, name, _id } = pub
          return <li key={_id} className='pub-wrapper'>
            <div className='pub'>
              <h2 className='name'>{name}</h2>
              <p className='borough'><FontAwesomeIcon icon={faLocationPin} />{borough ? borough : address}</p>
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
