import { QuizModel } from '@models'
import { Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { PageButton } from '@components/ui'
import {
  DashboardFormikField,
  DashboardFormikToggle,
  DashboardQuizContext,
  DashboardQuizEmojiPicker,
} from '@components/dashboard'
import { fuego } from '@nandorojo/swr-firestore'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export const DashboardQuizFormEditDetail: React.FunctionComponent = () => {
  const router = useRouter()
  const [emoji, setEmoji] = useState<string>(null)
  const { quiz, updateQuiz } = useContext(DashboardQuizContext)

  const removeQuestion = async () => {
    if (quiz.currentStatus !== 'creating') {
      toast.error('😃クイズ作成中以外は削除できません')
    }
    if (window.confirm('このクイズを本当に削除しますか? 後戻りできません。')) {
      try {
        await Promise.all(
          await quiz.flow.map(async (data) => {
            await fuego.db.doc(`quiz/${quiz.id}/question/${data}`).delete()
          })
        )
        await fuego.db.doc(`quiz/${quiz.id}`).delete()
        router.push('/dashboard')

        toast.success('😃クイズを削除できました!')
      } catch (error) {
        console.error(error)
        toast.error('😥クイズの削除に失敗しました')
      }
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={quiz}
        onSubmit={async (value: QuizModel) => {
          updateQuiz({
            title: value.title,
            description: value.description,
            emoji: emoji ? emoji : value.emoji,
            permission: value.permission,
          })
          toast.success('😆クイズを更新できました!')
        }}>
        {({ values }) => (
          <Form style={{ width: '100%' }}>
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

            <DashboardFormikToggle
              title="🔰クイズ終了後に再度プレイ可能にする"
              name="permission.playagain"
              defaultChecked={values.permission.playagain}
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
                このクイズを削除する
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
