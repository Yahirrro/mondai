type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
  style?: React.CSSProperties
}

export const PageButton: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <button
        type={props.type}
        className="PageButton"
        onClick={props.onClick}
        style={props.style}>
        {props.children}
      </button>
      <style jsx>
        {`
          .PageButton {
            font-family: var(--mainFontFamily);
            word-break: keep-all;
            background-color: var(--mainAccentColor);
            color: black;
            font-weight: 700;
            padding: 5px 15px;
            font-size: 0.9rem;
            border-radius: 7px;
            border: 1px solid black;
            height: inherit;
            cursor: pointer;
            height: 40px;
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}
