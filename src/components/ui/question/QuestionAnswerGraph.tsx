import { QuestionModel } from '@models'
import { PageNumber, ScreenLoading } from '@components/ui'

type Props = {
  title?: string
  children?: React.ReactNode
  data: QuestionModel['choice']
  correctAnswer: number
  style?: React.CSSProperties
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
      <div className="QuestionAnswerGraph" style={props.style}>
        <h2 className="QuestionAnswerGraph_title">
          {props.title ? props.title : allAmount() + '人のみんなのこたえ'}
        </h2>
        <div className="QuestionAnswerGraph_grid">
          {props.data[0].answerAmount == null ? (
            <ScreenLoading
              style={{
                height: 'auto',
              }}
            />
          ) : (
            props.data.map((choice, index) => {
              return (
                <div className="QuestionAnswerGraph_choice" key={choice.title}>
                  <div
                    style={{
                      alignSelf: 'center',
                    }}>
                    <h3 className="QuestionAnswerGraph_label">
                      {index == props.correctAnswer && '👑'}
                      {choice.title}
                    </h3>
                    <p className="QuestionAnswerGraph_labelDescription">
                      {choice.answerAmount +
                        '人' +
                        ' / ' +
                        ((choice.answerAmount / allAmount()) * 100).toFixed(1) +
                        '%'}
                    </p>
                  </div>

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
                      <PageNumber
                        number={choice.answerAmount}
                        type={index == props.correctAnswer ? 'answer' : null}
                        unit="人"
                      />
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
            width: 100%;
            &_title {
              display: inline-block;
              padding-bottom: 10px;
              border-bottom: 2px solid rgba(0, 0, 0, 0.2);
              margin-top: 0;
              margin-bottom: 15px;
            }
            &_grid {
              display: grid;
              grid-auto-columns: 1fr;
              grid-auto-rows: 100px;
              gap: 10px;
            }
            &_choice {
              display: grid;
              gap: var(--mainNormalPaddingSize);
              grid-template-columns: 300px 1fr;
              grid-auto-rows: 100px;
              @media (max-width: 750px) {
                grid-template-columns: 1fr 1fr;
              }
            }
            &_label {
              opacity: 0.8;
              margin: 0;
              @media (max-width: 750px) {
                font-size: 1rem;
              }
            }
            &_labelDescription {
              opacity: 0.5;
              align-self: center;
              margin-top: 5px;
              margin-bottom: 0;
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
                background-size: auto auto;
                background-image: var(--mainBackgroundPattern);
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
          .QuestionAnswerGraph + .QuestionAnswerGraph {
            margin-top: var(--mainNormalPaddingSize);
          }
        `}
      </style>
    </>
  )
}
