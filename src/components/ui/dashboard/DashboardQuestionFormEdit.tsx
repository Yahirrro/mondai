import { fuego, useDocument } from '@nandorojo/swr-firestore'
import firebase from 'firebase/app'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { QuizNote, PageButton, DashboardQuestionEdit } from '@components/ui'
import { QuestionModel } from '@models'
import { useRouter } from 'next/router'
import { useDashboardQuizUI } from '@hook/dashboard'

export const DashboardQuestionFormEdit: React.FunctionComponent = () => {
  const router = useRouter()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [answer, setAnswer] = useState<number>(null)
  const { data: question, update: updateQuestion } = useDocument<QuestionModel>(
    router.query.quizId && dashboardQuizUI.optional?.questionId
      ? `quiz/${router.query.quizId}/question/${dashboardQuizUI.optional?.questionId}`
      : null,
    {
      initialData: dashboardQuizUI.optional?.questionData,
      listen: true,
    }
  )

  const removeQuestion = () => {
    if (window.confirm('この問題を削除しますか?')) {
      try {
        fuego.db.doc(`quiz/${router.query.quizId}`).update({
          flow: firebase.firestore.FieldValue.arrayRemove(question.id),
        })
        fuego.db
          .doc(`quiz/${router.query.quizId}/question/${question.id}`)
          .delete()

        setDashboardQuizUI({ type: dashboardQuizUI.type, open: false })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const submitQuestion = async (
    value,
    { setSubmitting, setErrors, setStatus }
  ) => {
    try {
      updateQuestion({
        title: value.title,
        commentary: value.commentary,
        answer: answer == undefined ? value.answer : answer,
        choice: value.choice,
      })
      setStatus({ success: true })
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
      initialValues={question}
      validate={(values) => {
        const errors = {} as { [key: string]: string }
        if (values.choice.length == 0) {
          errors.choice =
            '選択肢がありません。「選択肢を追加する」を押して、追加しましょう!'
        } else if ((answer == undefined ? values.answer : answer) == null) {
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
            title="問題を編集する"
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
              更新する
            </PageButton>

            <div
              style={{ marginTop: '30px', textAlign: 'right', width: '100%' }}>
              <a
                style={{
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: 'red',
                  opacity: 0.6,
                }}
                onClick={removeQuestion}>
                この問題を削除する
              </a>
            </div>
          </QuizNote>
        </Form>
      )}
    </Formik>
  )
}
