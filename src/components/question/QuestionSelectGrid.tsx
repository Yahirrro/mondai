type Props = {
  children: React.ReactNode
}

export const QuestionSelectGrid: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="QuestionGridSelect">
      {props.children}
      <style jsx>
        {`
          .QuestionGridSelect {
            display: grid;
            gap: var(--mainNormalPaddingSize);
            margin-top: calc(var(--mainNormalPaddingSize) * 1.5);
            margin-bottom: var(--mainNormalPaddingSize);
            grid-template-columns: repeat(
              auto-fit,
              [col-start] minmax(380px, 1fr) [col-end]
            );
            @media (max-width: 750px) {
              grid-template-columns: 1fr;
              margin-top: calc(var(--mainNormalPaddingSize) * 2);
            }
            &_input {
              cursor: pointer;
              width: 100%;
              height: 60px;
              padding: 1rem 1rem;
              border: 1px solid whitesmoke;
            }
          }
        `}
      </style>
    </div>
  )
}
