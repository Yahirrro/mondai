import { QuizModel } from '@models'
import { Form, Formik } from 'formik'
import React from 'react'
import { DashboardFormikField, PageButton } from '@components/ui'
import { useDocument } from '@nandorojo/swr-firestore'

type Props = {
  quizId: string
}

export const DashboardQuizFormEditDetail: React.FunctionComponent<Props> = (
  props
) => {
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
            icon: value.icon,
          })
          updateQuiz({
            title: value.title,
            description: value.description,
            icon: value.icon,
          })
        }}>
        {() => (
          <Form style={{ width: '100%' }}>
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
              更新する
            </PageButton>
          </Form>
        )}
      </Formik>
    </>
  )
}
