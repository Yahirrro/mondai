import { useContext } from 'react'

import { IconCorrect, IconIncorrect, PageShare } from '@components/ui'
import { QuizContext } from '@components/quiz'

type Props = {
  percent: number
}

export const QuizCorrectCardBig: React.FunctionComponent<Props> = (props) => {
  const { quiz, correctAnswers } = useContext(QuizContext)

  return (
    <>
      <div className="QuizCorrectCardBig">
        <h3 className="QuizCorrectCardBig_title">あなたの解答結果はこちら😍</h3>
        <div className="QuizCorrectCardBig_correct">
          <div className="QuizCorrectCardBig_correctFlex">
            <div className="QuizCorrectCardBig_number">
              <IconCorrect />
              <p>{correctAnswers.correct}</p>
            </div>
            <div className="QuizCorrectCardBig_number">
              <IconIncorrect />
              <p>{correctAnswers.incorrect}</p>
            </div>
          </div>
          <p className="QuizCorrectCardBig_description">
            全{quiz?.flow.length}問, 正答率 {props.percent}%
          </p>
        </div>

        <p className="QuizCorrectCardBig_description">
          あなたの結果を共有してみませんか？！
        </p>
        <PageShare
          style={{ marginTop: '20px' }}
          url={`https://mondai.page/quiz/${quiz?.id}`}
          text={`${quiz?.flow.length}問中、💮${correctAnswers.correct}問正解でした!!\n\n${quiz?.title}`}
        />
      </div>

      <style jsx>
        {`
          .QuizCorrectCardBig {
            background: #efefef;
            border-radius: 30px;
            padding: 30px 50px;
            @media (max-width: 750px) {
              padding: 40px var(--mainNormalPaddingSize);
            }
            &_title {
              margin-top: 0;
              margin-bottom: 20px;
              font-size: 20px;
              line-height: 24px;
              text-align: center;
            }
            &_content {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 10px;
            }
            &_correct {
              background-color: white;
              padding: 20px 10px;
              border-radius: 30px;
              margin-bottom: 20px;
            }
            &_correctFlex {
              display: flex;
              justify-content: center;
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
              &:nth-of-type(2) {
                margin-left: 30px;
              }
            }
            &_description {
              font-weight: bold;
              font-size: 1rem;
              text-align: center;
              color: rgba(0, 0, 0, 0.5);
            }
          }
        `}
      </style>
    </>
  )
}
