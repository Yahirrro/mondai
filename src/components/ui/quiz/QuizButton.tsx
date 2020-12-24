import { IconLoading } from '@components/ui'

type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  isLoading?: boolean
  style?: React.CSSProperties
}

export const QuizButton: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <button
        className="QuizButton"
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.style}>
        <div className="QuizButton_content">
          {props.isLoading && (
            <IconLoading style={{ stroke: 'white', marginRight: '20px' }} />
          )}
          {props.text}
        </div>
      </button>
      <style jsx>
        {`
          .QuizButton {
            user-select: none;
            background: #00b2ff;
            color: #ffffff;
            border-radius: 20px;
            height: 75px;
            min-width: 300px;
            padding: 0 30px;
            border: none;
            outline: none;
            cursor: pointer;

            font-family: var(--mainFontFamily);
            font-weight: bold;
            font-size: 24px;
            line-height: 33px;

            transition: all 0.5s;
            @media (max-width: 750px) {
              width: 100%;
              height: 60px;
            }
            &_content {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            &:disabled {
              cursor: not-allowed;
              opacity: 0.2;
            }
            &:hover {
              box-shadow: var(--mainBoxShadow);
            }
            &:active {
              transform: translateY(5px);
              box-shadow: none;
            }
          }
        `}
      </style>
    </>
  )
}
