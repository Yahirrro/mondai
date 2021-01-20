import { fuego, useDocument } from '@nandorojo/swr-firestore'
import firebase from 'firebase/app'
import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { PageButton } from '@components/ui'
import { QuizNote } from '@components/quiz'
import { DashboardQuestionEdit } from '@components/dashboard'
import { QuestionModel } from '@models'
import { useRouter } from 'next/router'
import { useDashboardQuizUI } from '@hook/dashboard'
import { toast } from 'react-toastify'

export const DashboardQuestionFormEdit: React.FunctionComponent = () => {
  const router = useRouter()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [answer, setAnswer] = useState<number | null>(null)
  const { data: question, update: updateQuestion } = useDocument<QuestionModel>(
    router.query.quizId && dashboardQuizUI.optional?.questionId
      ? `quiz/${router.query.quizId}/question/${dashboardQuizUI.optional?.questionId}`
      : null,
    {
      initialData: dashboardQuizUI.optional?.questionData,
    }
  )

  useEffect(() => {
    if (question?.answer) setAnswer(question?.answer)
  }, [question])

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
        toast.success('😃問題を削除できました!')
      } catch (error) {
        console.error(error)
        toast.error('😥問題の削除に失敗しました')
      }
    }
  }

  const submitQuestion = async (
    value,
    { setSubmitting, setErrors, setStatus }
  ) => {
    try {
      if (value.choice.length >= answer + 1 == false) return
      if (answer == null) return
      updateQuestion({
        title: value.title,
        commentary: value.commentary,
        answer: answer,
        choice: value.choice,
      })
      toast.success('😆問題を編集できました!')
      setStatus({ success: true })
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
      toast.error('😥問題の編集に失敗しました')
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
