type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

export const PageButton: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <button
        className="PageButton"
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.style}>
        {props.text}
      </button>
      <style jsx>
        {`
          .PageButton {
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
