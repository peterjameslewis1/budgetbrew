import dynamic from 'next/dynamic';
import Header from './components/Header/Header'
import 'mapbox-gl/dist/mapbox-gl.css';


const DynamicHome = dynamic(() => import('./components/Home/Home'), {
  ssr: false,
});

export default async function Page() {
  return (
      <div className='content'>
        <Header />
        <DynamicHome />
      </div>
  )
}
