import { QuestionModel, QuizModel } from '@models'
import { fuego, useCollection, useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import {
  DashboardFormikField,
  DashboardQuestionCard,
  DashboardQuestionEdit,
  DashboardQuizLayout,
  IconIncorrect,
  PageButton,
  PageFormInput,
  QuizNote,
  ScreenError,
  ScreenLoading,
} from '@components/ui'

import { Formik, Field, Form, FieldArray } from 'formik'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'

type Props = { params: ParsedUrlQuery }

export default function Home(props: Props): React.ReactElement {
  const router = useRouter()
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
  const { data: question, update: updateQuestion } = useDocument<QuestionModel>(
    props.params.questionId
      ? `quiz/${props.params.quizId}/question/${props.params.questionId}`
      : null,
    {
      listen: true,
    }
  )
  const [answer, setAnswer] = useState<number>(
    question?.answer && question.answer
  )
  useEffect(() => {
    setAnswer(question?.answer)
  }, [question?.answer, router.query.questionId])

  if (question !== undefined && question?.exists == false)
    return <ScreenError code={404} />

  const removeQuestion = () => {
    if (window.confirm('この問題を削除しますか?')) {
      try {
        fuego.db.doc(`quiz/${quiz.id}`).update({
          flow: firebase.firestore.FieldValue.arrayRemove(question.id),
        })
        fuego.db.doc(`quiz/${quiz.id}/question/${question.id}`).delete()
        router.push(`/dashboard/quiz/${router.query.quizId}/question`)
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <QuizNote title="問題の編集">
          {!question ? (
            <ScreenLoading style={{ backgroundColor: 'white' }} />
          ) : (
            <Formik
              enableReinitialize
              initialValues={question}
              onSubmit={async (value: QuestionModel) => {
                console.log({
                  title: value.title,
                  commentary: value.commentary,
                  answer: answer == undefined ? value.answer : answer,
                  choice: value.choice,
                })
                updateQuestion({
                  title: value.title,
                  commentary: value.commentary,
                  answer: answer == undefined ? value.answer : answer,
                  choice: value.choice,
                })
              }}>
              {({ values, errors }) => (
                <Form style={{ width: '100%' }}>
                  <DashboardQuestionEdit
                    values={values}
                    answer={answer}
                    setAnswer={setAnswer}
                    errors={errors}
                  />
                  <div>
                    <PageButton
                      type="submit"
                      buttontype="big"
                      style={{
                        marginTop: 'var(--mainNormalPaddingSize)',
                        width: '100%',
                        color: 'white',
                        backgroundColor: 'var(--mainPrimaryColor)',
                      }}>
                      更新する
                    </PageButton>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </QuizNote>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <PageButton
            style={{ backgroundColor: 'rgb(255, 0, 0)', color: 'white' }}
            onClick={removeQuestion}>
            削除する
          </PageButton>
        </div>
        <h2
          style={{
            marginTop: 'var(--mainNormalPaddingSize)',
            marginBottom: '10px',
          }}>
          別の質問
        </h2>
        <div className="DashboardQuestionCardSlider">
          {quiz?.flow.map((data, index) => {
            const question = questions?.find(
              (questions) => data == questions.id
            )
            if (!question) return
            return (
              <DashboardQuestionCard
                key={question.id}
                index={index}
                quiz={quiz}
                question={question}
                type="small"
              />
            )
          })}
        </div>
        <style jsx>
          {`
            .DashboardQuestionCardSlider {
              display: grid;
              gap: 10px;
              grid-auto-flow: column;
              grid-auto-columns: 300px;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
              :global(.DashboardQuestionCard) {
                scroll-snap-align: start;
              }
              :global(.DashboardQuestionCard + .DashboardQuestionCard) {
                margin: 0 !important;
              }
            }
            .DashboardQuestionEdit {
              padding: 40px 30px;
              border-radius: 30px;
              background: #ffffff;
              @media (max-width: 1100px) {
                padding: 40px 20px;
              }
              &_info {
                margin-bottom: 40px;
                h1 {
                  margin: 0;
                }
              }
              &_body {
                display: grid;
                gap: 30px;
                label {
                  font-weight: bold;
                }
              }
              &_comment {
                margin-top: 6px;
                margin-bottom: 0;
                font-size: 0.9rem;
                font-weight: normal;
                opacity: 0.6;
              }
            }
          `}
        </style>
      </DashboardQuizLayout>
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
