type Props = {
  children: React.ReactNode
  title: string
  description: string
  style?: React.CSSProperties
}

export const PageCard: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="PageCard">
      <h3 className="PageCard_title">{props.title}</h3>
      <p className="PageCard_description">{props.description}</p>
      {props.children}
      <style jsx>
        {`
          .PageCard {
            padding: 30px 20px;
            background: #ffffff;
            border-radius: 20px;
            &_title {
              text-align: center;
              margin-top: 0;
              margin-bottom: 10px;
              font-size: 24px;
              line-height: 33px;
            }
            &_description {
              font-weight: bold;
              font-size: 18px;
              line-height: 22px;
              text-align: center;
              color: rgba(0, 0, 0, 0.34);
              margin-top: 10px;
              margin-bottom: 0;
            }
          }
        `}
      </style>
    </div>
  )
}
