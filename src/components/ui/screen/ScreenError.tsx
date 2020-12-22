import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import { FunctionComponent } from 'react'

type PropsOptional = {
  code: number
}

export const ScreenError: FunctionComponent<PropsOptional> = (props) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage statusCode={props.code} />
    </>
  )
}
