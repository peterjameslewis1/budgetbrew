import Header from './components/Header/Header'
import Home from './components/Home/Home'

export default async function Page() {
  return (
      <div className='content'>
        <Header />
        <Home />
      </div>
  )
}
