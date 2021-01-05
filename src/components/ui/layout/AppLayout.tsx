import dynamic from 'next/dynamic'
import { DefaultSeo } from 'next-seo'
import {
  PageNavbar,
  PageFooter,
  PageModal,
  PageAccentWave,
} from '@components/ui'
import { useUI } from '@components/ui/context'
import type {
  ModalLogin as ModalLoginType,
  ModalUserName as ModalUserNameType,
} from '@components/modal'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

const ModalLogin = dynamic(() =>
  import('@components/modal').then((lib) => lib.ModalLogin)
) as typeof ModalLoginType
const ModalUserName = dynamic(() =>
  import('@components/modal').then((lib) => lib.ModalUserName)
) as typeof ModalUserNameType

type Props = {
  children?: React.ReactNode
}

export const AppLayout: React.FunctionComponent<Props> = (props) => {
  const { displayModal, closeModal, modalView } = useUI()
  const router = useRouter()
  return (
    <>
      <Head>
        <link rel="icon" href="/logo/LogoIcon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
        />
      </Head>
      <DefaultSeo
        dangerouslySetAllPagesToNoIndex={true}
        dangerouslySetAllPagesToNoFollow={true}
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          site_name: 'mondai',
        }}
        twitter={{
          handle: '@Yahimotto',
          cardType: 'summary_large_image',
        }}
      />

      <PageModal open={displayModal} onRequestClose={closeModal}>
        {modalView === 'LOGIN_VIEW' && <ModalLogin />}
        {modalView === 'USERNAME_VIEW' && <ModalUserName />}
      </PageModal>

      {!(router.pathname == '/quiz/[quizId]' || router.pathname == '/') && (
        <PageAccentWave />
      )}

      {router.pathname !== '/quiz/[quizId]' && <PageNavbar />}

      {props.children}

      <PageFooter />
    </>
  )
}
