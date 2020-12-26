import { useContext } from 'react'
import {
  PageNumber,
  QuestionSelectGrid,
  QuestionAnswerGraph,
  QuizNote,
} from '@components/ui'

import { QuizContext } from '@components/ui'

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
