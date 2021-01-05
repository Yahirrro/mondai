import { useContext } from 'react'
import { PageNumber, IconAdd, PageButton } from '@components/ui'
import { QuestionSelectGrid, QuestionAnswerGraph } from '@components/question'

import { QuizContext, QuizNote } from '@components/quiz'
import Link from 'next/link'

export const QuizScreenArchive: React.FunctionComponent = () => {
  const { quiz, allQuestion } = useContext(QuizContext)

  return (
    <>
      <h2>全ての問題が終了しました！</h2>

      <QuestionSelectGrid>
        <div>
          <h3>すべての参加者数🎉</h3>
          <PageNumber number={quiz?.allUser} unit="人" />
        </div>
        <div>
          <h3>ぜんぶ正解した人🎉</h3>
          <PageNumber number={quiz?.allCorrectUser?.length} unit="人" />
        </div>
      </QuestionSelectGrid>

      <QuizNote title="😍おつかれさまでした!">
        <p>クイズ大会おつかれさまでした👺</p>
        <p>mondaiをつかったクイズ大会はいかがでしたか？</p>
        <p>
          たのしんでもらえたなら、またmondaiをつかってクイズ大会をひらいてみてください😘
        </p>
        <Link href="/dashboard">
          <a style={{ marginTop: '20px', width: '100%' }}>
            <PageButton icon={<IconAdd />} style={{ width: '100%' }}>
              いますぐクイズをつくる
            </PageButton>
          </a>
        </Link>
      </QuizNote>
      <QuizNote title="😏みんなのこたえ">
        {quiz?.flow?.map((data, index) => {
          if (!allQuestion) return
          const questionData = allQuestion?.find(
            (element) => element.id == data
          )
          return (
            <QuestionAnswerGraph
              key={questionData.title}
              data={questionData.choice}
              correctAnswer={questionData.answer}
              title={index + 1 + '. ' + questionData.title}
            />
          )
        })}
      </QuizNote>
    </>
  )
}
