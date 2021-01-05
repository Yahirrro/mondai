import { useContext } from 'react'

import { IconCorrect, IconIncorrect, PageCard } from '@components/ui'
import { QuizContext } from '@components/quiz'

export const QuizCorrectCard: React.FunctionComponent = () => {
  const { quiz, correctAnswers } = useContext(QuizContext)

  return (
    <>
      <PageCard title="正解状況" description={`全${quiz?.flow.length}問`}>
        <div className="QuizCorrectCard_content">
          <div className="QuizCorrectCard_number">
            <IconCorrect />
            <p>{correctAnswers.correct}</p>
          </div>
          <div className="QuizCorrectCard_number">
            <IconIncorrect />
            <p>{correctAnswers.incorrect}</p>
          </div>
        </div>
      </PageCard>

      <style jsx>
        {`
          .QuizCorrectCard {
            &_content {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            &_number {
              display: flex;
              justify-content: center;
              align-items: center;
              p {
                font-weight: bold;
                font-size: 72px;
                line-height: 87px;
                margin: 0;
              }
            }
          }
        `}
      </style>
    </>
  )
}
