import {
  DashboardLayout,
  DashboardQuestionCard,
  PageButton,
  QuizCard,
} from '@components/ui'
import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const { data: quiz } = useDocument<QuizModel>(
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

  return (
    <>
      <DashboardLayout quizId={props.params.quizId as string}>
        <header className="DashboardFlex">
          <QuizCard
            title={quiz?.title}
            description={quiz?.description}
            icon={quiz?.icon}
          />
        </header>

        <header style={{ margin: '30px 0' }}>
          <div className="DashboardFlex">
            <div>質問数： {quiz?.flow.length}</div>
            <div>
              <PageButton>質問をふやす</PageButton>
            </div>
          </div>
        </header>

        <div>
          {quiz?.exists == true &&
            questions !== [] &&
            quiz?.flow.map((data, index) => {
              const question = questions?.find(
                (questions) => data == questions.id
              )
              console.log(question)
              if (!question) return
              return (
                <DashboardQuestionCard
                  key={question.id}
                  index={index}
                  quiz={quiz}
                  question={question}
                />
              )
            })}
        </div>
      </DashboardLayout>
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
