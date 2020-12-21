type Props = {
  title: string
  style?: React.CSSProperties
}

export const QuestionTitle: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <h1 className="QuestionTitle" style={props.style}>
        {props.title}
      </h1>
      <style jsx>
        {`
          .QuestionTitle {
            position: relative;
            z-index: 1;
            font-weight: bold;
            font-size: 64px;
            line-height: 87px;
            margin-left: 40px;
            margin-bottom: 0;
            @media (max-width: 750px) {
              font-size: 40px;
              line-height: 1.5;
              margin-left: 0;
              text-align: center;
            }
            &:before {
              content: 'Q';
              position: absolute;
              top: -70px;
              left: -40px;
              z-index: 0;
              font-weight: bold;
              font-size: 144px;
              line-height: 174px;
              opacity: 0.05;
              @media (max-width: 750px) {
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
              }
            }
          }
        `}
      </style>
    </>
  )
}
