import React from 'react'

import 'firebase/firestore'
import 'firebase/auth'
import { Fuego } from '@components/lib/fuego'
import { FuegoProvider } from '@nandorojo/swr-firestore'

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { firebaseConfig } from '@components/lib/firebaseConfig'
import { AppLayout } from '@components/ui'
import { ManagedUIContext } from '@components/ui/common/context'

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
          </AppLayout>
        </ManagedUIContext>
      </FuegoProvider>
    </RecoilRoot>
  )
}

export default MyApp
