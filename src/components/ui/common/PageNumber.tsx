type Props = {
  number: number
  unit: string
  type?: string
}

export const PageNumber: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div
        className={
          'PageNumber ' + `${props.type && `PageNumber-` + props.type}`
        }>
        <p className="PageNumber_number">
          {props.number.toLocaleString()}
          <span className="PageNumber_unit">{props.unit}</span>
        </p>
        <style jsx>
          {`
            .PageNumber {
              color: rgba(0, 0, 0, 0.34);
              &-small {
                .PageNumber_number {
                  font-size: 100px;
                }
              }
              &-answer {
                .PageNumber_number {
                  color: rgba(255, 230, 0, 0.7);
                  -webkit-text-stroke: 1px black;
                }
              }
              &_number {
                word-break: keep-all;
                display: inline-block;
                font-weight: bold;
                font-size: 144px;
                line-height: 174px;
                letter-spacing: -0.1em;
                margin: 0;
                @media (max-width: 950px) {
                  font-size: 6rem;
                  line-height: 1;
                }
              }
              &_unit {
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
