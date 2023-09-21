import Header from './components/Header/Header'
import { SubmitData } from './types/Types'
import { GET } from './api/route'
import Home from './components/Home/Home'

export default async function Page() {
  const response = await GET()
  const posts = await response.json()
  const { status, data }: { status: number, data: SubmitData[] } = posts
  console.log('posts', data)
  return (
      <div className='content'>
        <Header />
        { status === 200 && <Home posts={data} /> }
      </div>
  )
}
