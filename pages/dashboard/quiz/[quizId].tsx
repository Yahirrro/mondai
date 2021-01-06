import {
  DashboardQuizLayout,
  DashboardQuizContext,
} from '@components/dashboard'
import { ScreenError, ScreenLoading } from '@components/screen'
import { useAuthentication } from '@hook/auth'
import { useDashboardQuizUI } from '@hook/dashboard'
import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'

const DashboardQuizScreenDetail = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizScreenDetail)
)
const DashboardQuizScreenQuestion = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizScreenQuestion)
)
const DashboardQuizScreenPermission = dynamic(() =>
  import('@components/dashboard').then(
    (lib) => lib.DashboardQuizScreenPermission
  )
)
const DashboardQuizScreenMessage = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizScreenMessage)
)

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const user = useAuthentication()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [pageType, setPageType] = useState<
    'detail' | 'question' | 'permission' | 'message'
  >('detail')

  const { data: quiz, error: errorQuiz } = useDocument<QuizModel>(
    props.params.quizId ? `quiz/${props.params.quizId}` : null,
    {
      listen: true,
    }
  )
  const { data: questions } = useCollection<QuestionModel>(
    props.params.quizId ? `quiz/${props.params.quizId}/question` : null,
    {
      listen: true,
    }
  )

  if (quiz?.exists == false) return <ScreenError code={404} />

  if (
    errorQuiz ||
    quiz?.permission[user?.userId]?.some(
      (data) => data == 'owner' || data == 'answer'
    ) == false
  )
    return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizContext.Provider
        value={{
          quiz,
          questions,
          dashboardQuizUI,
          setDashboardQuizUI,
          pageType,
          setPageType,
        }}>
        <DashboardQuizLayout>
          {!quiz?.exists ? (
            <ScreenLoading />
          ) : (
            <>
              {pageType == 'detail' && <DashboardQuizScreenDetail />}
              {pageType == 'question' && <DashboardQuizScreenQuestion />}
              {pageType == 'message' && <DashboardQuizScreenMessage />}
              {pageType == 'permission' && <DashboardQuizScreenPermission />}
            </>
          )}
        </DashboardQuizLayout>
      </DashboardQuizContext.Provider>
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
