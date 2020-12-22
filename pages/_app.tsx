import React from 'react'
import 'firebase/firestore'
import 'firebase/auth'
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { firebaseConfig } from '@components/lib/firebaseConfig'

const fuego = new Fuego(firebaseConfig)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <FuegoProvider fuego={fuego}>
        <Component {...pageProps} />
      </FuegoProvider>
    </RecoilRoot>
  )
}

export default MyApp
