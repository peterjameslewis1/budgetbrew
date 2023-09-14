import styles from './page.module.css'
import dynamic from 'next/dynamic'
import Submit from './components/Submit/Submit'
import Header from './components/Header/Header'
import Results from './components/Results/Results'
import { getData } from './api/route'

const DynamicAutoComplete = dynamic(
  () => import('./components/AutoComplete/AutoComplete'),
  { ssr: false }
)
export default async function Home() {
  // const data = await getData()
  // console.log('data', data)
  return (
    <main className={styles.main}>
      <div className='content'>
        <Header />
        <div className='intro'>
        <h4>BudgetBrews is here to help you find the most affordable pubs in town.</h4>
        <p>No signup required. Search and submit your local pub prices.</p>
        </div>
        <Submit />
        <Results />
      </div>
    </main>
  )
}
