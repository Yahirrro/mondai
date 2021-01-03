import { Form, Formik } from 'formik'
import { useState } from 'react'
import {
  DashboardFormikField,
  DashboardQuizEmojiPicker,
  PageButton,
  QuizNote,
} from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import { useDashboardQuizUI } from '@hook/dashboard'

export const DashboardQuizFormCreate: React.FunctionComponent = () => {
  const router = useRouter()
  const user = useAuthentication()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [emoji, setEmoji] = useState<string>('')

  const submitPermission = async (
    value,
    { setSubmitting, setErrors, setStatus }
  ) => {
    try {
      const addQuiz = await fuego.db.collection(`quiz`).add({
        title: value.title,
        description: value.description,
        emoji: emoji,
        flow: [],
        currentStatus: 'creating',
        permission: [
          { userId: user?.userId, permission: 'owner' },
          { userId: user?.userId, permission: 'answer' },
        ],
      })
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
          flow: [],
          currentStatus: 'creating',
          permission: [
            { userId: user?.userId, permission: 'owner' },
            { userId: user?.userId, permission: 'answer' },
          ],
        }}
        onSubmit={submitPermission}>
        {({ values }) => (
          <Form style={{ width: '100%' }}>
            <QuizNote
              title="クイズをつくる"
              style={{
                padding: '0',
              }}>
              <p style={{ marginBottom: '15px' }}>
                さあ、クイズをつくってみましょう!
                項目はすべてあとから編集できます!
              </p>
              <DashboardQuizEmojiPicker
                emoji={emoji ? emoji : values.emoji}
                setEmoji={setEmoji}
              />
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
