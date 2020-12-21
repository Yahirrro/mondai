type Props = {
  text: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => React.MouseEvent<HTMLButtonElement, MouseEvent>
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
