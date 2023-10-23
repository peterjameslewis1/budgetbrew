"use client"
import { SubmitData } from '@/app/types/Types'
import moment from 'moment';
import Result from './Result'

export default function Results({ posts, query = '', isLoading }: { posts: SubmitData[], query: string, isLoading: boolean }) {
  return (
    <div className='results'>
      { !posts.length && query === '' && isLoading && <h2>Loading...</h2>}
      { !posts.length && query === '' && !isLoading && <h2>No posts</h2>}
      { !posts.length && query !== '' && <h2>No posts match your query</h2>}
      { posts.length > 0 && <div className='number-of-results'><p>{posts.length} results</p></div> }
      {/* <div className='remove-weatherspoons'>
        <label>Hide Weatherspoons
          <input type="checkbox" onChange={(e) => setHideSpoons(e.target.checked)} />
        </label>
      </div> */}
        <ul className='pubs'>
        { posts.length > 0 && posts.map((pub) => {
          const postDate = pub.date ? moment(pub.date).fromNow() : ''
          const { borough, drink, price, full_address, address, name, _id } = pub
          return <Result
                  key={_id}
                  name={name}
                  full_address={full_address}
                  address={address}
                  price={price}
                  drink={drink}
                  borough={borough}
                  postDate={postDate}
                  />
        })}
        </ul>
    </div>
  )
}
