import { QuizModel } from '@models'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import {
  DashboardFormikField,
  PageButton,
  DashboardQuizEmojiPicker,
} from '@components/ui'
import { fuego, useDocument } from '@nandorojo/swr-firestore'
import { toast } from 'react-toastify'

type Props = {
  quizId: string
}

export const DashboardQuizFormEditDetail: React.FunctionComponent<Props> = (
  props
) => {
  const [emoji, setEmoji] = useState<string>(null)

  const { data: quiz, update: updateQuiz } = useDocument<QuizModel>(
    props.quizId ? `quiz/${props.quizId}` : null,
    {
      listen: true,
    }
  )

  const removeQuestion = async () => {
    if (quiz.currentStatus !== 'creating') {
      toast.error('😃クイズ作成中以外は削除できません')
    }
    if (window.confirm('このクイズを本当に削除しますか? 後戻りできません。')) {
      try {
        await Promise.all(
          await quiz.flow.map(async (data) => {
            console.log(data)
            await fuego.db.doc(`quiz/${quiz.id}/question/${data}`).delete()
          })
        )
        await fuego.db.doc(`quiz/${quiz.id}`).delete()

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
          console.log({
            title: value.title,
            description: value.description,
            emoji: emoji ? emoji : value.emoji,
          })
          updateQuiz({
            title: value.title,
            description: value.description,
            emoji: emoji ? emoji : value.emoji,
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
          </Form>
        )}
      </Formik>
    </>
  )
}
