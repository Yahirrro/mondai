import {
  DashboardQuizLayout,
  DashboardQuizFormEditPerm,
  ScreenLoading,
  ScreenError,
} from '@components/ui'
import { useQuizData } from '@hook/dashboard'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const { quizData: quiz } = useQuizData()

  if (quiz?.exists == false) return <ScreenError code={404} />
  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <NextSeo title={`${quiz?.title}の権限を変える`} />
        {!quiz ? <ScreenLoading /> : <DashboardQuizFormEditPerm />}
      </DashboardQuizLayout>
      <style jsx>
        {`
          .DashboardFlex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params: params,
    },
    revalidate: 60,
  }
}
