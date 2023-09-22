import Header from './components/Header/Header'
import { SubmitData } from './types/Types'
import { GET } from './api/route'
import Home from './components/Home/Home'

export default async function Page() {
  const response = await GET()
  const posts = await response.json()
  const { data }: { status: number, data: SubmitData[] } = posts
  return (
      <div className='content'>
        <Header />
        <Home posts={data} />
      </div>
  )
}
