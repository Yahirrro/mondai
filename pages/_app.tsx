import React from 'react'
import 'firebase/firestore'
import 'firebase/auth'
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const firebaseConfig = {
  apiKey: 'AIzaSyB98ul0ugEa2hCdUqq8NZc8LsmkkGiQTdQ',
  authDomain: 'realtimequiz-app.firebaseapp.com',
  projectId: 'realtimequiz-app',
  storageBucket: 'realtimequiz-app.appspot.com',
  messagingSenderId: '856823559264',
  appId: '1:856823559264:web:b45f2ef213d92c7dfabf05',
  measurementId: 'G-TQC6899536',
}

const fuego = new Fuego(firebaseConfig)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FuegoProvider fuego={fuego}>
      <Component {...pageProps} />
    </FuegoProvider>
  )
}

export default MyApp
