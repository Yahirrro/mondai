import {
  DashboardFormikField,
  DashboardQuizLayout,
  PageButton,
  QuizNote,
  ScreenError,
  ScreenLoading,
} from '@components/ui'
import { QuizModel } from '@models'
import { useDocument } from '@nandorojo/swr-firestore'
import { Form, Formik } from 'formik'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const { data: quiz, update: updateQuiz } = useDocument<QuizModel>(
    props.params.quizId ? `quiz/${props.params.quizId}` : null,
    {
      listen: true,
    }
  )
  if (quiz?.exists == false) return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <QuizNote title="クイズのタイトルとか説明文を変えるフォーム">
          {!quiz ? (
            <ScreenLoading style={{ backgroundColor: 'white' }} />
          ) : (
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
                  />
                  <DashboardFormikField
                    title="🙌クイズの説明文"
                    description="説明文だよ！ちょっとだけかいてね！"
                    name="description"
                  />
                  <DashboardFormikField
                    title="🖼クイズのアイコンURL"
                    description="好きなアイコンを指定しよう！"
                    name="icon"
                    type="url"
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
          )}
        </QuizNote>
      </DashboardQuizLayout>
      <style jsx>
        {`
          .DashboardFlex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params: params,
    },
    revalidate: 60,
  }
}
