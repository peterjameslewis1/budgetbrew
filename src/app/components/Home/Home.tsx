
require('dotenv').config()
import { SubmitData } from '../../types/ClientTypes'
import Results from '../../components/Results/Results'
import Intro from '../Intro/Intro'
import {GET} from '../../api/route'
import { Response } from '@/app/types/ServerTypes'

export default async function Home() {
  // const res: Response = await GET()
  // console.log('res', res.body)
  console.log('process.env.URL', process.env.URL)
  const res = await fetch(`${process.env.URL}`)
  const json = await res.json()
  console.log('json', json)

  return (
    <main>
        <Intro />
        {/* <Results posts={data} />  */}
    </main>
  )
}
