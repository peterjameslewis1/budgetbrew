import Header from './components/Header/Header'
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from './components/Home/Home'
import dynamic from 'next/dynamic'

const DynamicHome = dynamic(() => import('./components/Home/Home'))

export default async function Page() {
  return (
      <div className='content'>
        <Header />
        <DynamicHome />
      </div>
  )
}
