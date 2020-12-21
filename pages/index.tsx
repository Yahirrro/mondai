import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import { useAuthentication } from '@components/hook/auth'
import { fuego } from '@nandorojo/swr-firestore'

export default function Home(): ReactElement {
  const user = useAuthentication()
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
        {user?.userId}
        <button
          onClick={() => {
            const googleAuthProvider = new fuego.auth.GoogleAuthProvider()
            fuego.auth().signInWithPopup(googleAuthProvider)
          }}>
          Sign In with Google
        </button>
      </div>
    </>
  )
}
