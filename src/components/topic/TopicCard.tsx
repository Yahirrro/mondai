import { TopicModel } from '@models'
import Link from 'next/link'

type Props = {
  topic: TopicModel
  isBig?: boolean
  style?: React.CSSProperties
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
    150
      ? 'black'
      : 'white'

  return (
    <Link href={`/topic/${props.topic.id}`}>
      <div
        className={`TopicCard ${props.isBig ? 'TopicCard-big' : ''}`}
        style={{
          color: textColor,
          backgroundColor: props.topic.color,
          ...props.style,
        }}>
        <div
          className="TopicCard_icon"
          style={{ color: props.topic.color }}></div>
        <div className="TopicCard_info">
          <a>
            <h1>{props.topic.title}</h1>
          </a>
          <p>{props.topic.description}</p>
        </div>
        <style jsx>
          {`
            .TopicCard {
              display: grid;
              grid-template-columns: 44px 1fr;
              gap: 15px;
              padding: 10px 15px;
              border-radius: 20px;
              //background: var(--mainBackgroundPattern);
              //background-size: auto auto;
              background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='black' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E");
              overflow: hidden;
              cursor: pointer;
              a {
                color: unset;
              }
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
                  ${props.topic.isCampaign &&
                  'content: "PR" !important; font-size: 90%;'}
                }
              }
              &_info {
                overflow: hidden;
                align-self: center;
                h1,
                p {
                  margin: 0;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                h1 {
                  font-size: 1.6rem;
                  line-height: 1.4;
                  &:before {
                    content: '#';
                  }
                }
                p {
                  font-size: 0.9rem;
                  font-weight: bold;
                  opacity: 0.8;
                }
              }

              &-big {
                padding: 20px;
                grid-template-columns: 64px 1fr;
                @media (max-width: 750px) {
                  padding: 15px;
                }
                .TopicCard_icon {
                  width: 64px;
                  height: 64px;
                  margin: 0;
                }
                .TopicCard_info {
                  h1,
                  p {
                    white-space: unset;
                    overflow: unset;
                    text-overflow: initial;
                  }
                  h1 {
                    font-size: 2rem;
                    @media (max-width: 750px) {
                      font-size: 1.6rem;
                    }
                  }
                  p {
                    font-size: 1rem;
                  }
                }
              }
            }
          `}
        </style>
      </div>
    </Link>
  )
}
