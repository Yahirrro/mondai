import { TopicModel } from '@models'

type Props = {
  topic: TopicModel
}

export const TopicCard: React.FunctionComponent<Props> = (props) => {
  const hex2rgb = (hex) => {
    if (hex.slice(0, 1) == '#') hex = hex.slice(1)
    if (hex.length == 3)
      hex =
        hex.slice(0, 1) +
        hex.slice(0, 1) +
        hex.slice(1, 2) +
        hex.slice(1, 2) +
        hex.slice(2, 3) +
        hex.slice(2, 3)

    return [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)].map(function (
      str
    ) {
      return parseInt(str, 16)
    })
  }

  const backgroundColor = hex2rgb(props.topic.color)

  const textColor =
    backgroundColor[0] * 0.299 +
      backgroundColor[1] * 0.587 +
      backgroundColor[2] * 0.114 >
    186
      ? 'black'
      : 'white'

  return (
    <div
      className="TopicCard"
      style={{ color: textColor, backgroundColor: props.topic.color }}>
      <div
        className="TopicCard_icon"
        style={{ color: props.topic.color }}></div>
      <div className="TopicCard_info">
        <h3>{props.topic.title}</h3>
        <p>クイズをつくってみませんか?</p>
      </div>
      <style jsx>
        {`
          .TopicCard {
            display: grid;
            grid-template-columns: 44px 1fr;
            gap: 15px;
            padding: 10px 15px;
            border-radius: 20px;
            background: var(--mainBackgroundPattern);
            background-size: auto auto;
            overflow: hidden;
            scroll-snap-align: start;
            &_icon {
              margin: 10px 0;
              width: 44px;
              height: 44px;
              background-color: white;
              border-radius: 50%;

              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 35px;
              font-weight: bold;
              &:before {
                content: '#';
              }
            }
            &_info {
              overflow: hidden;
              align-self: center;
              h3,
              p {
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              h3 {
                font-size: 1.6rem;
                line-height: 1.4;
              }
              p {
                font-size: 0.9rem;
                font-weight: bold;
                opacity: 0.8;
              }
            }
          }
        `}
      </style>
    </div>
  )
}
