import { QuestionModel } from '@components/models'
import { PageNumber, ScreenLoading } from '@components/ui'

type Props = {
  data: QuestionModel['choice']
  correctAnswer: number
}

export const QuestionAnswerGraph: React.FunctionComponent<Props> = (props) => {
  const allAmount = () => {
    let amountData = 0
    props.data.map((d) => (amountData += d.answerAmount))
    return amountData
  }

  const getMostBigAmount = () => {
    return props.data.reduce(
      (a, b) => (a > b.answerAmount ? a : b.answerAmount),
      0
    )
  }

  return (
    <>
      <div className="QuestionAnswerGraph">
        <h2 className="QuestionAnswerGraph_title">
          {allAmount()}人のみんなのこたえ
        </h2>
        <div className="QuestionAnswerGraph_grid">
          {!props.data[0].answerAmount ? (
            <ScreenLoading
              style={{
                height: 'auto',
              }}
            />
          ) : (
            props.data.map((choice, index) => {
              return (
                <div className="QuestionAnswerGraph_choice" key={choice.title}>
                  <h3 className="QuestionAnswerGraph_label">
                    {index == props.correctAnswer && '👑'}
                    {choice.title}
                    <br />
                    <small>{choice.answerAmount}人</small>
                  </h3>
                  <div
                    className={`QuestionAnswerGraph_graph-${
                      index == props.correctAnswer ? 'correct' : 'incorrect'
                    }`}
                    style={{
                      width:
                        (choice.answerAmount / getMostBigAmount()) * 100 + '%',
                    }}>
                    <div
                      className={`QuestionAnswerGraph_graphAmount ${
                        (choice.answerAmount / getMostBigAmount()) * 100 < 50
                          ? 'QuestionAnswerGraph_graphAmount-left'
                          : ''
                      }`}>
                      <PageNumber number={choice.answerAmount} unit="人" />
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
      <style jsx>
        {`
          .QuestionAnswerGraph {
            margin-top: calc(var(--mainNormalPaddingSize) * 2);
            &_title {
              margin-top: 0;
              font-size: 24px;
              line-height: 33px;
            }
            &_grid {
              display: grid;
              grid-auto-columns: 1fr;
              grid-auto-rows: 100px;
            }
            &_choice {
              display: grid;
              grid-template-columns: 150px 1fr;
              grid-auto-rows: 100px;
              @media (max-width: 750px) {
                grid-template-columns: 100px 1fr;
              }
            }
            &_label {
              align-self: center;
              margin: 0;
            }
            &_graph {
              user-select: none;
              position: relative;
              align-self: center;
              width: 100%;
              height: 50px;
              background: #c4c4c4;
              border: 2px solid #000000;
              border-radius: 0px 10px 10px 0px;
              &-incorrect {
                @extend .QuestionAnswerGraph_graph;
                background: #c4c4c4;
              }
              &-correct {
                @extend .QuestionAnswerGraph_graph;
                background: #ffe600;
              }
            }
            &_graphAmount {
              position: absolute;
              top: 50%;
              right: 15px;
              transform: translateY(-50%);
              &-left {
                right: 0;
                transform: translateY(-50%) translateX(100%);
              }
              @media (max-width: 750px) {
                transform: translateY(-50%);
                left: 0;
              }
            }
          }
        `}
      </style>
    </>
  )
}
