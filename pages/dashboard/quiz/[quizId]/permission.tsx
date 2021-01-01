import {
  DashboardQuizLayout,
  DashboardQuizFormEditPerm,
  ScreenLoading,
} from '@components/ui'
import { QuizModel } from '@models'
import { useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const { data: quiz } = useDocument<QuizModel>(
    props.params.quizId ? `quiz/${props.params.quizId}` : null,
    {
      listen: true,
    }
  )

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
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
