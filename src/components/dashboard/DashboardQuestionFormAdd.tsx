import { fuego, useDocument } from '@nandorojo/swr-firestore'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { PageButton } from '@components/ui'
import { QuizNote } from '@components/quiz'
import { DashboardQuestionEdit } from '@components/dashboard'
import { useDashboardQuizUI } from '@hook/dashboard'
import { toast } from 'react-toastify'
import { QuizModel } from '@models'
import { useRouter } from 'next/router'

export const DashboardQuestionFormAdd: React.FunctionComponent = () => {
  const router = useRouter()
  const [answer, setAnswer] = useState<number>(null)
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const { data: quiz, update: updateQuiz } = useDocument<QuizModel>(
    router.query.quizId ? `quiz/${router.query.quizId}` : null
  )

  const submitQuestion = async (
    value,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      if (value.choice.length >= answer + 1 == false) return
      await fuego.db
        .collection(`quiz/${dashboardQuizUI.optional?.quizId}/question`)
        .add({
          title: value.title,
          choice: value.choice,
          answer: answer,
          commentary: value.commentary,
        })
        .then(async (docRef) => {
          updateQuiz({
            flow: [...quiz?.flow, docRef.id],
          })
          resetForm({})
          setAnswer(null)
          setStatus({ success: true })
          setDashboardQuizUI({ type: dashboardQuizUI.type, open: false })
          toast.success('😆問題を追加できました!')
        })
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
      toast.error('😥問題を追加できませんでした...')
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
        } else if (
          answer == null ||
          values.choice.length >= answer + 1 == false
        ) {
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
          }}>
          <QuizNote
            title="問題をふやす"
            style={{
              padding: '0',
            }}>
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
