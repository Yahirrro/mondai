import React, { useEffect } from 'react'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/performance'
import { Fuego } from '@lib/fuego'
import { FuegoProvider } from '@nandorojo/swr-firestore'
import { firebaseConfig } from '@lib/firebaseConfig'
const fuego = new Fuego(firebaseConfig)

if (typeof window !== 'undefined' && !fuego.length) {
  fuego.analytics()
  fuego.performance()
}

import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import { AppLayout } from '@components/ui'
import { ManagedUIContext } from '@components/ui/context'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../styles/globals.scss'
import { useRouter } from 'next/router'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      fuego.analytics()?.logEvent('page_view', {
        page_location: url,
        page_path: location.pathname,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

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
