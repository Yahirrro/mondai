import { IconLoading } from '@components/ui'

type Props = {
  title: string
  description: string
  icon: string
  style?: React.CSSProperties
}

export const QuizCard: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuizCard" style={props.style}>
        {props.icon ? (
          <img className="QuizCard_image" src={props.icon} alt={props.title} />
        ) : (
          <div className="QuizCard_imageBox"></div>
        )}
        <div className="QuizCard_info">
          <h2 className="QuizCard_title">
            {props.title ? props.title : <IconLoading />}
          </h2>
          <p className="QuizCard_description">{props.description}</p>
        </div>

        <style jsx>
          {`
            .QuizCard {
              background-color: white;
              display: inline-flex;
              flex-direction: row;
              align-items: flex-start;
              border-radius: 20px;
              padding: 20px;
              &_image,
              &_imageBox {
                width: 64px;
                min-width: 64px;
                height: 64px;
                margin-right: 20px;
                border-radius: 50%;
              }
              &_imageBox {
                background-color: var(--mainAccentColor);
              }
              &_title,
              &_description {
                margin-top: 0;
                margin-bottom: 0;
              }
              &_title {
                font-size: 30px;
                line-height: 44px;
              }
              &_description {
                font-size: 1rem;
                font-weight: bold;
                opacity: 0.5;
                line-height: 1.4;
              }
              &_button {
                width: 100%;
              }
              @media (max-width: 750px) {
                width: 100%;
                &_info {
                  display: grid;
                  gap: 8px;
                }
                &_title {
                  font-size: 1.6rem;
                  line-height: 1.4;
                }
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
