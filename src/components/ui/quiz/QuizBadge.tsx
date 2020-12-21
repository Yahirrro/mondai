type Props = {
  text: string
  style?: React.CSSProperties
}

export const QuizBadge: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuizBadge" style={props.style}>
        <img className="QuizBadge_icon" src="" alt="" />
        <p className="QuizBadge_text">{props.text}</p>

        <style jsx>
          {`
            .QuizBadge {
              background-color: white;
              display: flex;
              height: 30px;
              width: fit-content;
              padding: 5px 15px;
              border-radius: 20px;
              &_text {
                margin: 0;
                font-size: 14px;
                font-weight: bold;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
