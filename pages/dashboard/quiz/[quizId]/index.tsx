import {
  DashboardQuizFormEditDetail,
  DashboardQuizLayout,
  QuestionAnswerGraph,
  QuizNote,
  ScreenError,
  ScreenLoading,
} from '@components/ui'
import { useQuizData } from '@hook/dashboard'
import { QuestionModel } from '@models'
import { useCollection } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const { quizData: quiz } = useQuizData()
  const { data: questions } = useCollection<QuestionModel>(
    props.params.quizId && quiz?.currentStatus == 'archive'
      ? `quiz/${props.params.quizId}/question`
      : null,
    {
      listen: true,
    }
  )
  if (quiz?.exists == false) return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        {quiz?.currentStatus !== 'archive' ? (
          <QuizNote title="クイズのタイトルとか説明文を変えるフォーム">
            {!quiz ? (
              <ScreenLoading style={{ backgroundColor: 'white' }} />
            ) : (
              <DashboardQuizFormEditDetail
                quizId={props.params.quizId as string}
              />
            )}
          </QuizNote>
        ) : (
          <QuizNote title="😏みんなのこたえ">
            {quiz?.flow?.map((data, index) => {
              if (!questions) return
              const questionData = questions?.find(
                (element) => element.id == data
              )
              return (
                <QuestionAnswerGraph
                  key={questionData.title}
                  data={questionData.choice}
                  correctAnswer={questionData.answer}
                  title={index + 1 + '. ' + questionData.title}
                />
              )
            })}
          </QuizNote>
        )}
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
