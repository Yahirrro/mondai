export const PageFormInput: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return (
    <>
      <input className="PageFormInput" {...props} />
      <style jsx>
        {`
          .PageFormInput {
            font-family: var(--mainFontFamily);
            max-width: 100%;
            width: 100%;
            display: inline-flex;
            font-size: 1rem;
            height: 2.5em;
            justify-content: flex-start;
            line-height: 1.5;
            padding: calc(0.5em - 1px) calc(0.75em - 1px);
            position: relative;
            vertical-align: top;
            background-color: #fff;
            border: 1px solid rgba(76, 123, 87, 0.3);
            border-radius: 4px;
            outline: none;
          }
          :global(label > .PageFormInput) {
            margin-top: 10px;
          }
        `}
      </style>
    </>
  )
}
