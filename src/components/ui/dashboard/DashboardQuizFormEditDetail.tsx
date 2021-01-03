import { QuizModel } from '@models'
import { Form, Formik } from 'formik'
import { useState } from 'react'
import {
  DashboardFormikField,
  PageButton,
  DashboardQuizEmojiPicker,
} from '@components/ui'
import { useDocument } from '@nandorojo/swr-firestore'

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
          </Form>
        )}
      </Formik>
    </>
  )
}
