export const PageFormToggle: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
> = (props) => {
  return (
    <>
      <input
        {...props}
        type="checkbox"
        id="PageFormToggle_input"
        className="PageFormToggle_input"></input>
      <label htmlFor="PageFormToggle_input" className="PageFormToggle"></label>

      <style jsx>
        {`
          .PageFormToggle {
            display: inline-block;
            width: 50px;
            height: 30px;
            position: relative;
            cursor: pointer;
            user-select: none;
            border-radius: 15px;
            padding: 3px;
            background-color: #d9d9d9;
            transition: all 0.3s;
            &:after {
              position: absolute;
              display: block;
              content: '';
              left: 3px;
              right: initial;
              width: 24px;
              height: 24px;
              background: white;
              border-radius: 50%;
              transition: all 0.3s;
            }
            &_input {
              display: none;
            }
          }
          .PageFormToggle_input:checked + .PageFormToggle {
            background-color: var(--mainPrimaryColor);
          }
          .PageFormToggle_input:checked + .PageFormToggle:after {
            left: 23px;
            right: 3px;
          }
        `}
      </style>
    </>
  )
}
