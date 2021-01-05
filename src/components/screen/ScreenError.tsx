import Head from 'next/head'
import DefaultErrorPage from 'next/error'

type Props = {
  code: number
}

export const ScreenError: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <DefaultErrorPage
        style={{ backgroundColor: 'var(--mainBackgroundColor)' }}
        statusCode={props.code}
      />
    </>
  )
}
