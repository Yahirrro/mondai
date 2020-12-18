type Props = {
  children: React.ReactNode
  title: string
  description: string
}

export const QuestionCard: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuestionCard">
        <h2 className="QuestionCard_title">{props.title}</h2>
        <p className="QuestionCard_description">{props.description}</p>

        {props.children}

        <style jsx>
          {`
            .QuestionCard {
              position: relative;
              width: 100%;
              max-width: 600px;
              margin: auto;
              padding: 30px;
              border: 1px solid whitesmoke;
              &:before {
                position: absolute;
                top: 0;
                left: 0;
                content: 'Q';
                font-weight: bold;
                font-size: 100px;
                opacity: 0.05;
              }

              &_title,
              &_description {
                margin-top: 0;
                margin-bottom: 1rem;
              }
              &_button {
                width: 100%;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
