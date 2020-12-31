import {
  DashboardQuestionFormAdd,
  DashboardQuestionCard,
  DashboardQuestionEdit,
  DashboardQuizLayout,
  PageButton,
  QuizNote,
  ScreenError,
  ScreenLoading,
} from '@components/ui'
import { useDashboardQuizUI } from '@hook/dashboard'
import { QuestionModel, QuizModel } from '@models'
import { fuego, useCollection, useDocument } from '@nandorojo/swr-firestore'
import firebase from 'firebase/app'
import { Form, Formik } from 'formik'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { useState } from 'react'

type Props = {
  params: ParsedUrlQuery
}
export default function Home(props: Props): React.ReactElement {
  const { setDashboardQuizUI } = useDashboardQuizUI()
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

  if (quiz?.exists == false) return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <header style={{ marginBottom: '30px' }}>
          <div className="DashboardFlex">
            <div>問題数： {quiz?.flow.length}</div>
            <div>
              <PageButton
                onClick={() =>
                  setDashboardQuizUI({
                    type: 'addQuestion',
                    open: true,
                    optional: { quizId: quiz.id },
                  })
                }>
                問題をふやす
              </PageButton>
            </div>
          </div>
        </header>

        <div>
          {quiz == undefined ? (
            <ScreenLoading />
          ) : (
            quiz?.flow.map((data, index) => {
              const question = questions?.find(
                (questions) => data == questions.id
              )
              if (!question) return
              return (
                <DashboardQuestionCard
                  index={index}
                  quiz={quiz}
                  question={question}
                  key={question.id}
                  onClick={() =>
                    setDashboardQuizUI({
                      type: 'editQuestion',
                      open: true,
                      optional: { questionId: question.id },
                    })
                  }
                />
              )
            })
          )}
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
