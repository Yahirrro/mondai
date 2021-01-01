import { Form, Formik } from 'formik'
import React from 'react'
import { DashboardFormikField, PageButton, QuizNote } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import { useDashboardQuizUI } from '@hook/dashboard'

export const DashboardQuizFormCreate: React.FunctionComponent = () => {
  const router = useRouter()
  const user = useAuthentication()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()

  const submitPermission = async (
    value,
    { setSubmitting, setErrors, setStatus }
  ) => {
    try {
      const addQuiz = await fuego.db.collection(`quiz`).add(value)
      router.push(`/dashboard/quiz/${addQuiz.id}`)
      setStatus({ success: true })
      setDashboardQuizUI({ type: dashboardQuizUI.type, open: false })
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
    }
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: '',
          description: '',
          icon: '',
          flow: [],
          currentStatus: 'creating',
          permission: [
            { userId: user?.userId, permission: 'owner' },
            { userId: user?.userId, permission: 'answer' },
          ],
        }}
        onSubmit={submitPermission}>
        {() => (
          <Form style={{ width: '100%' }}>
            <QuizNote
              title="問題をつくる"
              style={{
                padding: '0',
              }}>
              <p style={{ marginBottom: '15px' }}>
                さあ、クイズをつくってみましょう!
                項目はすべてあとから編集できます!
              </p>
              <DashboardFormikField
                title="👶クイズのタイトル"
                description="このクイズをひとことであらわすなら?"
                name="title"
                placeholder="たとえば: わかるかな? VTuberクイズ!"
                required
              />
              <DashboardFormikField
                title="🙌クイズの説明文"
                description="説明文だよ！ちょっとだけかいてね！"
                name="description"
                placeholder="たとえば: わかるひとにはわかる! とくべつな問題をチョイス!"
                required
              />
              <DashboardFormikField
                title="🖼クイズのアイコンURL"
                description="なくてもいいよ! 好きなアイコンを指定しよう！"
                name="icon"
                type="url"
                placeholder="たとえば: https://yahiro.me/yahiro.png"
              />
              <PageButton
                type="submit"
                buttontype="big"
                style={{
                  marginTop: 'var(--mainNormalPaddingSize)',
                  width: '100%',
                  color: 'white',
                  backgroundColor: 'var(--mainPrimaryColor)',
                }}>
                クイズをつくる!
              </PageButton>
            </QuizNote>
          </Form>
        )}
      </Formik>
    </>
  )
}
