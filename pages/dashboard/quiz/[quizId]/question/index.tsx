import {
  DashboardQuestionCard,
  DashboardQuizLayout,
  PageButton,
} from '@components/ui'
import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
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
  const { data: questions } = useCollection<QuestionModel>(
    props.params.quizId ? `quiz/${props.params.quizId}/question` : null,
    {
      listen: true,
    }
  )

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <header style={{ marginBottom: '30px' }}>
          <div className="DashboardFlex">
            <div>質問数： {quiz?.flow.length}</div>
            <div>
              <PageButton>質問をふやす</PageButton>
            </div>
          </div>
        </header>

        <div>
          {quiz?.exists == true &&
            questions !== [] &&
            quiz?.flow.map((data, index) => {
              const question = questions?.find(
                (questions) => data == questions.id
              )
              console.log(question)
              if (!question) return
              return (
                <DashboardQuestionCard
                  key={question.id}
                  index={index}
                  quiz={quiz}
                  question={question}
                />
              )
            })}
        </div>
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
