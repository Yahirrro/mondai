type Props = {
  number: number
  unit: string
}

export const PageNumber: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="PageNumber">
        <p className="PageNumber_number">
          {props.number.toLocaleString()}
          <span className="PageNumber_unit">{props.unit}</span>
        </p>
        <style jsx>
          {`
            .PageNumber {
              &_number {
                display: inline-block;
                font-weight: bold;
                font-size: 144px;
                line-height: 174px;
                letter-spacing: -0.1em;
                color: rgba(0, 0, 0, 0.34);
                margin: 0;
                @media (max-width: 950px) {
                  font-size: 6rem;
                  line-height: 1;
                }
              }
              &_unit {
                color: rgba(0, 0, 0, 0.34);
                font-weight: bold;
                font-size: 24px;
                line-height: 33px;
                margin-top: 0;
                margin-bottom: 0;
                margin-left: 1rem;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
