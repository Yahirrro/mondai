import React from 'react'

import 'firebase/firestore'
import 'firebase/auth'
import { Fuego } from '@lib/fuego'
import { FuegoProvider } from '@nandorojo/swr-firestore'

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { firebaseConfig } from '@lib/firebaseConfig'
import { AppLayout } from '@components/ui'
import { ManagedUIContext } from '@components/ui/context'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/globals.scss'

const fuego = new Fuego(firebaseConfig)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <FuegoProvider fuego={fuego}>
        <ManagedUIContext>
          <AppLayout>
            <Component {...pageProps} />
            <ToastContainer />
          </AppLayout>
        </ManagedUIContext>
      </FuegoProvider>
    </RecoilRoot>
  )
}

export default MyApp
