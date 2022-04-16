import type { NextPage } from 'next'
import Head from 'next/head'
import HomePage from '../components/HomePage'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Index | Entangle</title>
      </Head>
      <main>
        <HomePage />
      </main>
    </div>
  )
}

export default Home
