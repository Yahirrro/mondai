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
import { getDomain } from '@lib/api'

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
      <DefaultSeo
        dangerouslySetAllPagesToNoIndex={
          getDomain() == 'https://dev.mondai.page' && true
        }
        openGraph={{
          type: 'website',
          locale: 'ja_JP',
          site_name: 'mondai',
          images: [
            {
              url: `${getDomain()}/ogp/main.jpg`,
              width: 1200,
              height: 630,
              alt: 'mondai | みんなでリアルタイムクイズ',
            },
          ],
        }}
        twitter={{
          handle: '@Yahimotto',
          cardType: 'summary_large_image',
        }}
      />

      <PageModal
        open={displayModal}
        onRequestClose={closeModal}
        isNotClose={modalView === 'USERNAME_VIEW'}>
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
