type Props = {
  buttontype?: string
}

export const PageButton: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    Props
> = (props) => {
  return (
    <>
      <button
        className={
          'PageButton' +
          `${props.buttontype ? ` PageButton-${props.buttontype}` : ''} ${
            props.className
          }`
        }
        {...props}>
        {props.children}
      </button>
      <style jsx>
        {`
          .PageButton {
            user-select: none;
            font-family: var(--mainFontFamily);
            word-break: keep-all;
            background-color: var(--mainAccentColor);
            color: black;
            font-weight: 700;
            padding: 5px 15px;
            font-size: 0.9rem;
            border: 1px solid #e6e6e6;
            border-radius: 7px;
            height: inherit;
            cursor: pointer;
            height: 40px;
            text-decoration: none;
            &-big {
              height: 50px;
              border-radius: 25px;
              font-size: 1.2rem;
            }
          }
        `}
      </style>
    </>
  )
}
