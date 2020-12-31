import {
  DashboardQuestionCard,
  DashboardQuestionEdit,
  DashboardQuizLayout,
  PageButton,
  QuizNote,
  ScreenLoading,
} from '@components/ui'
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
            <div>問題数： {quiz?.flow.length}</div>
            <div>
              <PageButton>問題をふやす</PageButton>
            </div>
          </div>
        </header>

        <div>
          {quiz?.exists == false ? (
            <ScreenLoading />
          ) : (
            quiz?.flow.map((data, index) => {
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
                />
              )
            })
          )}
        </div>

        <DashboardQuestionAdd quizId={quiz?.id} />
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

export const DashboardQuestionAdd: React.FunctionComponent<{
  quizId: string
}> = (props) => {
  const [answer, setAnswer] = useState<number>(null)
  const submitQuestion = async (
    value,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      fuego.db
        .collection(`/quiz/${props.quizId}/question`)
        .add({
          title: value.title,
          choice: value.choice,
          answer: answer,
          commentary: value.commentary,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id)
          fuego.db.doc(`/quiz/${props.quizId}`).update({
            flow: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          })
          resetForm({})
          setAnswer(null)
          setStatus({ success: true })
        })
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
    }
  }
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: '',
        choice: [],
        answer: null,
        commentary: '',
      }}
      validate={(values) => {
        const errors = {} as { [key: string]: string }
        if (values.choice.length == 0) {
          errors.choice =
            '選択肢がありません。「選択肢を追加する」を押して、追加しましょう!'
        } else if (answer == null) {
          errors.choice =
            '正解がありません。「正解に」を押して、正解を作りましょう!'
        }
        return errors
      }}
      onSubmit={submitQuestion}>
      {({ values, errors, isSubmitting }) => (
        <Form
          style={{
            width: '100%',
            marginTop: 'var(--mainNormalPaddingSize)',
          }}>
          <QuizNote title="問題をふやす">
            <DashboardQuestionEdit
              values={values}
              setAnswer={setAnswer}
              answer={answer}
              errors={errors}
            />
            <PageButton
              type="submit"
              buttontype="big"
              disabled={isSubmitting}
              style={{
                marginTop: 'var(--mainNormalPaddingSize)',
                width: '100%',
                color: 'white',
                backgroundColor: 'var(--mainPrimaryColor)',
              }}>
              追加する
            </PageButton>
          </QuizNote>
        </Form>
      )}
    </Formik>
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
