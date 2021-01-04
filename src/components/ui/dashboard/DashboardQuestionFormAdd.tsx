import { fuego } from '@nandorojo/swr-firestore'
import firebase from 'firebase/app'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { QuizNote, PageButton, DashboardQuestionEdit } from '@components/ui'
import { useDashboardQuizUI } from '@hook/dashboard'
import { toast } from 'react-toastify'

export const DashboardQuestionFormAdd: React.FunctionComponent = () => {
  const [answer, setAnswer] = useState<number>(null)
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const submitQuestion = async (
    value,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      fuego.db
        .collection(`/quiz/${dashboardQuizUI.optional?.quizId}/question`)
        .add({
          title: value.title,
          choice: value.choice,
          answer: answer,
          commentary: value.commentary,
        })
        .then((docRef) => {
          fuego.db.doc(`/quiz/${dashboardQuizUI.optional?.quizId}`).update({
            flow: firebase.firestore.FieldValue.arrayUnion(docRef.id),
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
