import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { PageButton } from '@components/ui'
import {
  DashboardFormikField,
  DashboardQuizEmojiPicker,
} from '@components/dashboard'
import { QuizNote } from '@components/quiz'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import { useDashboardQuizUI } from '@hook/dashboard'
import { toast } from 'react-toastify'
import { QuizModel } from '@models'
import { sendLogEvent } from '@lib/api'
import { TopicCardGet } from '@components/topic'
import firebase from 'firebase/app'

export const DashboardQuizFormCreate: React.FunctionComponent = () => {
  const router = useRouter()
  const user = useAuthentication()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [emoji, setEmoji] = useState<string>('🍜')
  const topic = router.query.topicId
  const topicValue = topic ? { topicId: topic } : null

  useEffect(() => {
    if (dashboardQuizUI.open == false) router.push('/dashboard')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardQuizUI.open])

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
        permission: value.permission,
        playagain: {
          isPlayagain: false,
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        ...topicValue,
      })
      setStatus({ success: true })
      setDashboardQuizUI({ type: dashboardQuizUI.type, open: false })
      window.location.href = `/dashboard/quiz/${addQuiz.id}`
      toast('😆クイズを作成できました!')
      sendLogEvent('quiz_create', {
        items: [
          {
            id: addQuiz.id,
            title: value.title,
            description: value.description,
            emoji: emoji,
            owner: value.permission.owner[0],
            isPlayagain: false,
          },
        ],
      })
    } catch (error) {
      console.error(error)
      setStatus({ success: false })
      setSubmitting(false)
      setErrors({ submit: error.message })
      toast.error('😥クイズの作成に失敗しました...')
    }
  }
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          title: '',
          description: '',
          permission: {
            playagain: true,
            owner: [user?.userId] as QuizModel['permission']['owner'],
          },
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
              {topic && <TopicCardGet topicId={topic as string} />}
              <DashboardQuizEmojiPicker
                emoji={emoji ? emoji : values.emoji}
                setEmoji={setEmoji}
              />
              <DashboardFormikField
                title="👶クイズのタイトル"
                description="このクイズをひとことであらわすなら?"
                name="title"
                placeholder="たとえば: わかるかな? VTuberクイズ!"
                maxLength="30"
                required
              />
              <DashboardFormikField
                title="🙌クイズの説明文"
                description="説明文だよ！ちょっとだけかいてね！"
                name="description"
                placeholder="たとえば: わかるひとにはわかる! とくべつな問題をチョイス!"
                maxLength="50"
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
