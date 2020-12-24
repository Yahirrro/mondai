type Props = {
  title: string
  index: string
  type?: 'selected'
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const QuestionSelectCard: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div
        className={`QuestionSelectCard ${
          props.type && 'QuestionSelectCard-' + props.type
        }`}
        style={props.style}>
        <div className="QuestionSelectCard_index">{props.index}</div>
        <div className="QuestionSelectCard_title">{props.title}</div>
        <style jsx>
          {`
            .QuestionSelectCard {
              cursor: pointer;
              user-select: none;
              position: relative;
              width: 100%;
              height: 150px;
              padding: 30px;
              background-color: white;
              border-radius: 30px;
              display: flex;
              justify-content: left;
              align-items: center;
              overflow: hidden;

              transition: all 0.5s;
              @media (max-width: 950px) {
                height: 120px;
              }
              &_index {
                content: counter(item);
                display: block;
                width: 80px;
                text-align: center;
                opacity: 0.1;
                font-weight: bold;
                font-size: 120px;
                line-height: 145px;
                vertical-align: middle;
                margin-right: 20px;
              }
              &_title {
                display: flex;
                align-items: center;
                margin: 0;
                font-weight: bold;
                font-size: 36px;
                line-height: 49px;
                @media (max-width: 950px) {
                  font-size: 30px;
                }
              }

              &-selected {
                background-color: var(--mainAccentColor);
                background-size: auto auto;
                background-image: var(--mainBackgroundPattern);
                box-shadow: var(--mainBoxShadow);
              }
            }
            :global(input[type='radio']) {
              display: none;
            }
            :global(input[type='radio']:checked + label) {
              @extend .QuestionSelectCard-selected;
              transform: translateY(-10px);
            }
          `}
        </style>
      </div>
    </>
  )
}
