type Props = {
  exist?: boolean
  selected?: boolean
  clear?: boolean
  percent: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  style?: React.CSSProperties
}

export const DashboardMessagePercent: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <div
      className={`DashboardMessagePercent ${
        props.exist && `DashboardMessagePercent-exists`
      } ${props.selected && `DashboardMessagePercent-selected`} ${
        props.clear && `DashboardMessagePercent-clear`
      }`}
      onClick={props.onClick}
      style={props.style}>
      {props.percent}
      <span>%</span>
      <style jsx>
        {`
          .DashboardMessagePercent {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 82px;
            min-width: 82px;
            color: #c4c4c4;
            border: solid 2px #c4c4c4;
            border-radius: 20px;

            font-family: Inter;
            font-style: normal;
            font-weight: bold;
            font-size: 40px;
            line-height: 0.8;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: -0.1em;

            user-select: none;
            cursor: pointer;
            transition: transform 0.5s, opacity 0.5s;
            &:before {
              position: absolute;
              top: -40px;
              content: '';
              width: 20px;
              height: 20px;
              border-radius: 50%;
              opacity: 0;
              transition: opacity 0.5s;
              @media (max-width: 900px) {
                top: calc(50% - 10px);
                left: -45px;
              }
            }
            &:after {
              position: absolute;
              top: -45px;
              content: '→';
              color: rgba(255, 255, 255, 0);
              right: 6px;
              font-size: 36px;
              opacity: 0;
              transition: opacity 0.5s;
              @media (max-width: 900px) {
                bottom: 8px;
                content: '→';
                top: initial;
                right: initial;
                left: -48px;
                transform: rotate(90deg);
              }
            }
            &-exists {
              border: none;
              opacity: 1;
              color: black;
              background-color: var(--mainAccentColor);
              &:before {
                background-color: var(--mainAccentColor);
                opacity: 1;
              }
              &:after {
                color: var(--mainAccentColor);
                opacity: 1;
              }
            }
            &-selected {
              border: none;
              opacity: 1;
              transform: translateY(-5px);
              color: white;
              background-color: var(--mainPrimaryColor);
              box-shadow: var(--mainBoxShadow);
              &:before {
                background-color: var(--mainPrimaryColor);
                transform: translateY(5px);
                opacity: 1;
              }
              &:after {
                transform: translateY(5px);
                color: var(--mainPrimaryColor);
                opacity: 1;
                @media (max-width: 900px) {
                  transform: translateY(5px) rotate(90deg);
                }
              }
            }
            &-clear {
              transform: none;
              box-shadow: none;
              cursor: default;
              &:before {
                display: none;
              }
            }
            &:last-of-type {
              &:after {
                display: none;
              }
            }
            span {
              font-size: 60%;
            }

            @media (max-width: 900px) {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  )
}
