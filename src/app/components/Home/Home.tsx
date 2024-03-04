
require('dotenv').config()
import Submit from '../Submit/Submit'
import { SubmitData } from '../../types/Types'
import Results from '../../components/Results/Results'
import MapboxMap from '../MapboxMap/MapboxMap'
import sort from '../../utils/sort'
import Intro from '../Intro/Intro'
import {GET} from '../../api/route'

export default async function Home() {
  const { data = [] } = await GET()
  console.log('data', data)

  return (
    <main>
        <Intro />
        {/* <Results posts={data} />  */}
    </main>
  )
}
