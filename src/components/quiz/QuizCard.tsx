import { IconLoading } from '@components/ui'
import { QuizIconEmoji } from '@components/quiz'

type Props = {
  title: string
  description: string
  emoji: string
  playagain?: boolean
  long?: boolean
  style?: React.CSSProperties
}

export const QuizCard: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div
        className={`QuizCard ${props.playagain ? 'QuizCard-playagain' : ''} ${
          props.long ? 'QuizCard-long' : ''
        }`}
        style={props.style}>
        <div className="QuizCard_emoji">
          <QuizIconEmoji emoji={props.emoji} />
        </div>
        <div className="QuizCard_info">
          <h2 className="QuizCard_title">
            {props.title ? props.title : <IconLoading />}
          </h2>
          <p className="QuizCard_description">{props.description}</p>
        </div>

        <style jsx>
          {`
            .QuizCard {
              user-select: none;
              background-color: white;
              display: inline-grid;
              grid-template-columns: 64px 1fr;
              gap: 20px;
              border-radius: 20px;
              padding: 20px;
              align-items: center;
              &_emoji {
                width: 64px;
                min-width: 64px;
                height: 64px;
                border-radius: 50%;
                :global(.QuizIconEmoji) {
                  margin-right: 0;
                }
              }
              &_info {
                overflow: hidden;
              }
              &_title,
              &_description {
                margin-top: 0;
                margin-bottom: 0;
              }
              &_title {
                font-size: 30px;
                line-height: 44px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &_description {
                font-size: 1rem;
                font-weight: bold;
                opacity: 0.5;
                line-height: 1.4;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &_button {
                width: 100%;
              }
              &-playagain {
                border: 2px solid #d4d4d4;
              }
              &-long {
                .QuizCard_title,
                .QuizCard_description {
                  white-space: initial;
                  overflow: initial;
                  text-overflow: initial;
                }
              }
              @media (max-width: 750px) {
                grid-template-columns: 50px 1fr;
                width: 100%;
                gap: var(--mainNormalPaddingSize);
                padding: var(--mainNormalPaddingSize);
                &_emoji {
                  height: 52px;
                  width: 52px;
                  :global(.QuizIconEmoji) {
                    height: 52px;
                    width: 52px;
                  }
                }
                &_info {
                  display: grid;
                  gap: 5px;
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
