import { QuizModel } from '@models'
import { Field, Form, Formik } from 'formik'
import { PageButton, PageFormInput } from '@components/ui'
import { QuizNote } from '@components/quiz'
import { fuego, useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import { useAuthentication } from '@hook/auth'
import { toast } from 'react-toastify'

export const DashboardQuizFormEditPerm: React.FunctionComponent = () => {
  const router = useRouter()
  const user = useAuthentication()
  const { data: quiz } = useDocument<QuizModel>(
    router.query.quizId ? `quiz/${router.query.quizId}` : null,
    {
      listen: true,
    }
  )

  const submitPermission = async (
    value,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await fuego.db.doc(`quiz/${router.query.quizId}`).update({
        permission: { ...quiz.permission, [value.userId]: [] },
      })
      resetForm({})
      setStatus({ success: true })
      toast.success('😆権限を追加できました')
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
      toast.error('😥権限の追加に失敗しました')
    }
  }

  return (
    <>
      <QuizNote title="🗝権限を編集する">
        <div className="DashboardQuizFormEditPerm_index">
          {Object.entries(quiz.permission).map((data) => {
            return (
              <div className="DashboardQuizFormEditPerm_card" key={data[0]}>
                <h3>{data[0] == user?.userId ? 'あなた' : data[0]}</h3>

                <div className="DashboardQuizFormEditPerm_cardPerms">
                  {((data[1] as unknown) as Array<string>).map((data) => {
                    switch (data) {
                      case 'owner':
                        return <p key={data}>管理者</p>
                      case 'answer':
                        return <p key={data}>メイン回答者</p>
                      case 'moderator':
                        return <p key={data}>問題作成者</p>
                    }
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <Formik initialValues={{ userId: '' }} onSubmit={submitPermission}>
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
                <PageButton type="submit">権限を与える</PageButton>
              </div>
            </Form>
          )}
        </Formik>
      </QuizNote>
      <style jsx>
        {`
          .DashboardQuizFormEditPerm {
            &_index {
              display: grid;
              grid-template-columns: 1fr;
              width: 100%;
              gap: 15px;
            }
            &_card {
              h3 {
                margin-top: 0;
                margin-bottom: 10px;
              }
              &Perms {
                display: flex;
                p {
                  margin-top: 0;
                  margin-bottom: 0;
                  font-size: 0.9rem;
                  opacity: 0.6;
                }
                p + p {
                  margin-left: 10px;
                }
              }
            }
            &_form {
              margin-top: var(--mainNormalPaddingSize);
              display: grid;
              grid-template-columns: 1fr 150px;
              @media (max-width: 750px) {
                grid-template-columns: 1fr;
              }
            }
          }
        `}
      </style>
    </>
  )
}
