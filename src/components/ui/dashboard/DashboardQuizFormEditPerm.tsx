import { QuizModel } from '@models'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { PageButton, PageFormInput, QuizNote } from '@components/ui'
import { fuego, useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'

export const DashboardQuizFormEditPerm: React.FunctionComponent = () => {
  const [formUserId] = useState<string>(null)
  const [formPermission] = useState<string>(null)
  const router = useRouter()
  const { data: quiz } = useDocument<QuizModel>(
    router.query.quizId ? `quiz/${router.query.quizId}` : null,
    {
      listen: true,
    }
  )
  useEffect(() => {
    console.log(formPermission, formUserId)
  }, [formUserId, formPermission])

  const submitPermission = async (
    value,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await fuego.db.doc(`quiz/${router.query.quizId}`).update({
        permission: firebase.firestore.FieldValue.arrayUnion(value),
      })
      resetForm({})
      setStatus({ success: true })
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
    }
  }

  return (
    <>
      <QuizNote title="🗝権限を編集する">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            width: '100%',
          }}>
          {quiz.permission?.map((data) => {
            return (
              <div key={data.userId + data.permission}>
                {data.userId} / {data.permission}
              </div>
            )
          })}
        </div>
        <Formik
          initialValues={{ userId: '', permission: '' }}
          onSubmit={submitPermission}>
          {() => (
            <Form style={{ width: '100%' }}>
              <div className="DashboardQuizFormEditPerm_form">
                <Field
                  as={PageFormInput}
                  style={{ width: '100%' }}
                  type="text"
                  name="userId"
                  placeholder="UserId"
                  required
                />
                <Field as="select" name="permission" required>
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option value="moderator">つくるひと</option>
                  <option value="answer">メイン回答者</option>
                </Field>
                <PageButton type="submit">権限を与える</PageButton>
              </div>
            </Form>
          )}
        </Formik>
      </QuizNote>
      <style jsx>
        {`
          .DashboardQuizFormEditPerm_form {
            margin-top: var(--mainNormalPaddingSize);
            display: grid;
            grid-template-columns: 1fr 150px 150px;
            @media (max-width: 750px) {
              grid-template-columns: 1fr 1fr;
              :global(input[type='text']) {
                grid-column: 1/3;
              }
            }
          }
        `}
      </style>
    </>
  )
}
