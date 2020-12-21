type Props = {
  title: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const QuestionSelectCard: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuestionSelectCard" style={{ counterIncrement: 'item' }}>
        {props.children}
        <label
          className="QuestionSelectCard"
          htmlFor={props.title}
          style={props.style}>
          <div className="QuestionSelectCard_title">{props.title}</div>
          <style jsx>
            {`
              .QuestionSelectCard {
                cursor: pointer;
                position: relative;
                width: 100%;
                height: 150px;
                padding: 30px;
                background-color: white;
                border-radius: 30px;
                display: flex;
                justify-content: left;
                align-items: center;

                transition: all 0.5s;
                @media (max-width: 750px) {
                  height: 120px;
                }
                &_title {
                  display: flex;
                  align-items: center;
                  margin: 0;
                  font-size: 14px;
                  font-weight: bold;
                  font-size: 36px;
                  line-height: 49px;
                  @media (max-width: 750px) {
                    font-size: 30px;
                  }
                  &:before {
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
                }
              }
              :global(input[type='radio']) {
                display: none;
              }
              :global(input[type='radio']:checked + label) {
                background-color: var(--mainAccentColor);
                transform: translateY(-10px);
                box-shadow: var(--mainBoxShadow);
              }
            `}
          </style>
        </label>
      </div>
    </>
  )
}
