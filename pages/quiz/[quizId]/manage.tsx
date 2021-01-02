import { QuizModel } from '@models'
import { useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const { data: quiz, update: quizUpdate } = useDocument<QuizModel>(
    `quiz/${props.params.quizId}`,
    {
      listen: true,
    }
  )

  const [currentQuestion, setCurrentQuestion] = useState<string>(
    quiz?.currentQuestion
  )

  return (
    <div>
      <h1>
        {quiz?.title} / {quiz?.currentStatus}
      </h1>

      <button
        onClick={() => {
          quizUpdate({ currentStatus: 'creating' })
        }}>
        managed-update: creating
      </button>
      <br />
      <button
        onClick={() => {
          quizUpdate({ currentStatus: 'waiting' })
        }}>
        managed-update: waiting
      </button>
      <br />
      <button
        onClick={() => {
          quizUpdate({ currentStatus: 'open' })
        }}>
        managed-update: open
      </button>
      <br />
      <button
        onClick={() => {
          quizUpdate({ currentStatus: 'answer' })
        }}>
        managed-update: answer
      </button>
      <br />
      <button
        onClick={() => {
          quizUpdate({ currentStatus: 'archive' })
        }}>
        managed-update: archive
      </button>

      <br />
      <br />
      <select
        name="example"
        onChange={(event) => {
          const value = event.target.value
          setCurrentQuestion(value)
        }}>
        {quiz?.flow.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>

      <button
        onClick={() => {
          quizUpdate({ currentQuestion: currentQuestion })
        }}>
        update currentQuestion
      </button>
    </div>
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
  }
}
