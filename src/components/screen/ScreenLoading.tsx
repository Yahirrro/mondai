import { IconLoading } from '@components/ui'

type Props = {
  style?: React.CSSProperties
}

export const ScreenLoading: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="ScreenLoading" style={props.style}>
      <IconLoading />
      <style jsx>
        {`
          .ScreenLoading {
            height: 600px;
            width: 100%;
            background-color: var(--mainBackgroundColor);
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  )
}
