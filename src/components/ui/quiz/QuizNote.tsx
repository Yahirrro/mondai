type Props = {
  title: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export const QuizNote: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuizNote" style={props.style}>
        <h2>{props.title}</h2>
        {props.children}
        <style jsx>
          {`
            .QuizNote {
              display: flex;
              justify-content: left;
              align-items: center;
              flex-flow: wrap;
              padding: 30px;
              background-color: white;
              border-radius: 30px;
              @media (max-width: 750px) {
                padding: 20px;
              }
              h2 {
                width: 100%;
                font-size: 36px;
                line-height: 49px;
                @media (max-width: 950px) {
                  font-size: 30px;
                }
                margin-top: 0;
                margin-bottom: 1rem;
              }
            }
            :global(.QuizNote > p) {
              width: 100%;
              margin-top: 0;
              margin-bottom: 0;
            }
            :global(.QuizNote > h2 + p) {
            }
            :global(.QuizNote > p + p) {
              margin-top: 1rem;
            }
          `}
        </style>
      </div>
    </>
  )
}
