import { IconLoading } from '@components/ui'

type Props = {
  children?: React.ReactNode
  title: string
  description: string
  icon?: React.ReactNode
  style?: React.CSSProperties
}

export const PageCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="PageCard" style={props.style}>
      {props.icon && <div className="PageCard_icon">{props.icon}</div>}
      <h3 className="PageCard_title">
        {props.title ? props.title : <IconLoading />}
      </h3>
      <p className="PageCard_description">{props.description}</p>
      {props.children}
      <style jsx>
        {`
          .PageCard {
            padding: 30px 20px;
            background: #ffffff;
            border-radius: 20px;
            &_icon {
              height: 32px;
              text-align: center;
              margin-bottom: 10px;
              :global(svg) {
                width: 32px;
                height: 32px;
              }
            }
            &_title {
              text-align: center;
              margin-top: 0;
              margin-bottom: 10px;
              font-size: 24px;
              line-height: 33px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &_description {
              font-weight: bold;
              font-size: 18px;
              line-height: 22px;
              text-align: center;
              color: rgba(0, 0, 0, 0.5);
              margin-top: 10px;
              margin-bottom: 0;
            }
          }
        `}
      </style>
    </div>
  )
}
