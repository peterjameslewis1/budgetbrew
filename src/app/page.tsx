import dynamic from 'next/dynamic';
import Header from './components/Header/Header'

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
