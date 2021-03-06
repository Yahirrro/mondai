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
              height: fit-content;
              display: flex;
              justify-content: left;
              align-items: center;
              flex-flow: wrap;
              padding: 30px;
              background-color: white;
              border-radius: 30px;
              @media (max-width: 750px) {
                padding: 30px 20px;
              }
              h2 {
                width: 100%;
                font-size: 1.7em;
                line-height: 1.4;
                margin-top: 0;
                margin-bottom: 20px;
                @media (max-width: 950px) {
                  font-size: 1.5rem;
                  margin-bottom: 30px;
                }
              }
            }
            :global(.QuizNote + .QuizNote) {
              margin-top: var(--mainNormalPaddingSize);
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
