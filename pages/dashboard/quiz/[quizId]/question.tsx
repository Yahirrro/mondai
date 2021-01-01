import {
  DashboardQuestionCard,
  DashboardQuizLayout,
  PageButton,
  ScreenError,
  ScreenLoading,
} from '@components/ui'
import { useDashboardQuizUI, useQuizData } from '@hook/dashboard'
import { QuestionModel } from '@models'
import { useCollection } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  params: ParsedUrlQuery
}
export default function Home(props: Props): React.ReactElement {
  const { setDashboardQuizUI } = useDashboardQuizUI()
  const { quizData: quiz } = useQuizData()
  const { data: questions } = useCollection<QuestionModel>(
    props.params.quizId ? `quiz/${props.params.quizId}/question` : null,
    {
      listen: true,
    }
  )

  if (quiz?.exists == false) return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <NextSeo title={`${quiz?.title}の問題をつくる`} />

        <header style={{ marginBottom: '30px' }}>
          <div className="DashboardFlex">
            <div>問題数： {quiz?.flow.length}</div>
            <div>
              <PageButton
                onClick={() =>
                  setDashboardQuizUI({
                    type: 'addQuestion',
                    open: true,
                    optional: { quizId: quiz.id },
                  })
                }>
                問題をふやす
              </PageButton>
            </div>
          </div>
        </header>

        <div>
          {quiz == undefined ? (
            <ScreenLoading />
          ) : (
            quiz?.flow.map((data, index) => {
              const question = questions?.find(
                (questions) => data == questions.id
              )
              if (!question) return
              return (
                <DashboardQuestionCard
                  index={index}
                  quiz={quiz}
                  question={question}
                  key={question.id}
                  onClick={() =>
                    setDashboardQuizUI({
                      type: 'editQuestion',
                      open: true,
                      optional: {
                        questionId: question.id,
                        questionData: question,
                      },
                    })
                  }
                />
              )
            })
          )}
        </div>
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
