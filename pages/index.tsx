import Head from 'next/head'
import Link from 'next/link'
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
        <Link href={'/quiz/asd'}>
          <a>あああ</a>
        </Link>
      </div>
    </>
  )
}
