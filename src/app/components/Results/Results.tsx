"use client"
import { SubmitData } from '@/app/types/Types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationPin } from '@fortawesome/free-solid-svg-icons'

// const posts = [
//   {
//       "_id": "65047d9ca4f2c2fabec4ce89",
//       "name": "The Colton Arms",
//       "drink": "'Beer'",
//       "price": "5.00"
//   },
//   {
//       "_id": "6504858fdc632617cfbf1ec2",
//       "name": "Peter",
//       "drink": "beer",
//       "price": "0"
//   },
//   {
//       "_id": "65049578786d0f95088f308c",
//       "name": "The Atlas",
//       "price": "6.20",
//       "drink": "Peroni",
//       "borough": "Hammersmith"
//   },
//   {
//       "_id": "65049768acf8cc6d378e6ac6",
//       "name": "The Rylston",
//       "drink": "Birra Moretti",
//       "price": "4.80",
//       "full_address": "197 Lillie Road, London, SW6 7LW, United Kingdom",
//       "address": "197 Lillie Road",
//       "type": "bar"
//   },
//   {
//       "_id": "65049d3de79249df48464e2c",
//       "name": "Smiths of Bourne",
//       "drink": "Carlsberg",
//       "price": "4.80",
//       "full_address": "25 North St, Bourne, PE10 9AE, United Kingdom",
//       "address": "25 North St",
//       "type": "restaurant"
//   },
//   {
//       "_id": "65049d9bccc4d4d4fa667391",
//       "name": "The Colton Arms",
//       "drink": "Camden Hells Lager",
//       "price": "344",
//       "full_address": "187 Greyhound Rd, London, W14 9SD, United Kingdom",
//       "address": "187 Greyhound Rd",
//       "type": "bar"
//   },
//   {
//       "_id": "65049eb36638ab261ab42a53",
//       "name": "The Colton Arms",
//       "drink": "BrewDog",
//       "price": "3333",
//       "full_address": "187 Greyhound Rd, London, W14 9SD, United Kingdom",
//       "address": "187 Greyhound Rd",
//       "type": "bar"
//   },
//   {
//       "_id": "650580c78567a4d15fd78fcc",
//       "name": "The Colton Arms",
//       "drink": "Camden Pale",
//       "price": "11111",
//       "full_address": "187 Greyhound Rd, London, W14 9SD, United Kingdom",
//       "address": "187 Greyhound Rd",
//       "type": "bar"
//   },
//   {
//       "_id": "6505812b821ac71668590f52",
//       "name": "The White Swan",
//       "drink": "Bud Light",
//       "price": "11111",
//       "full_address": "14 New Row Covent Garden, London, WC2N 4LF, United Kingdom",
//       "address": "14 New Row Covent Garden",
//       "type": "restaurant"
//   },
//   {
//       "_id": "6505812b821ac71668590f53",
//       "name": "The White Swan",
//       "drink": "Bud Light",
//       "price": "11111",
//       "full_address": "14 New Row Covent Garden, London, WC2N 4LF, United Kingdom",
//       "address": "14 New Row Covent Garden",
//       "type": "restaurant"
//   },
//   {
//       "_id": "650594139e6cf37753fa80c9",
//       "name": "The Falcon",
//       "drink": "BrewDog Punk IPA",
//       "price": "11234",
//       "full_address": "London, W9 3DD, United Kingdom",
//       "address": "London",
//       "type": "bar"
//   },
//   {
//       "_id": "650594189e6cf37753fa80ca",
//       "name": "The Falcon",
//       "drink": "BrewDog Punk IPA",
//       "price": "11234",
//       "full_address": "London, W9 3DD, United Kingdom",
//       "address": "London",
//       "type": "bar"
//   },
//   {
//       "_id": "6505a77d9ec4d76ab28c681a",
//       "name": "The Griffin Inn",
//       "drink": "Bud Light",
//       "price": "123",
//       "full_address": "The Griffin, Uckfield, TN22 3SS, United Kingdom",
//       "address": "The Griffin",
//       "borough": "Fletching",
//       "type": "restaurant"
//   },
//   {
//       "_id": "6505a80caf512eca0a98ef51",
//       "name": "The Colton Arms",
//       "drink": "Coopers",
//       "price": "12345",
//       "full_address": "187 Greyhound Rd, London, W14 9SD, United Kingdom",
//       "address": "187 Greyhound Rd",
//       "borough": "Hammersmith and Fulham",
//       "type": "bar"
//   },
//   {
//       "_id": "6505a8834833992522b79321",
//       "name": "The Falcon",
//       "drink": "Carling",
//       "price": "12234",
//       "full_address": "2 St. Johns Hill, London, SW11 1RU, United Kingdom",
//       "address": "2 St. Johns Hill",
//       "borough": "Wandsworth",
//       "type": "restaurant"
//   }
// ]
export default function Results({ posts, query }: { posts: SubmitData[] }) {
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
