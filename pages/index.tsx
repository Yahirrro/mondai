import Head from 'next/head'
import { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>クイズ王</h1>
      </div>
    </>
  )
}
