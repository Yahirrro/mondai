type Props = {
  answer: string
  isAnswer: boolean
  style?: React.CSSProperties
}

export const QuizAnswer: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuizAnswer" style={props.style}>
        {props.isAnswer ? (
          <svg
            className="QuizAnswer_icon QuizAnswer_icon-correct"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
          </svg>
        ) : (
          <svg
            className="QuizAnswer_icon QuizAnswer_icon-incorrect"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        )}
        <h2 className="QuizAnswer_answer">{props.answer}</h2>
        <style jsx>
          {`
            .QuizAnswer {
              height: 150px;
              background-color: white;
              border-radius: 30px;
              padding: 30px;
              display: flex;
              justify-content: left;
              align-items: center;
              &_icon {
                display: block;
                width: 100px;
                height: 100px;
                text-align: center;
                font-weight: bold;
                font-size: 120px;
                line-height: 145px;
                vertical-align: middle;
                margin-right: 20px;
                &-correct {
                  fill: blue;
                }
                &-incorrect {
                  fill: red;
                }
              }
              &_answer {
                margin: 0;
                font-weight: bold;
                font-size: 36px;
                line-height: 49px;
                @media (max-width: 950px) {
                  font-size: 30px;
                }
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
