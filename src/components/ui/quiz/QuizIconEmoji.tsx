import Twemoji from 'react-twemoji'

type Props = {
  emoji: string
  style?: React.CSSProperties
}

export const QuizIconEmoji: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuizIconEmoji" style={props.style}>
        <Twemoji
          options={{
            className: 'twemoji',
            noWrapper: true,
            folder: 'svg',
            ext: '.svg',
          }}>
          {props.emoji}
        </Twemoji>
        <style jsx>
          {`
            .QuizIconEmoji {
              width: 64px;
              height: 64px;
              border-radius: 50%;
              background-color: var(--mainAccentColor);
              font-size: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              :global(.twemoji) {
                height: 32px;
                width: 32px;
                vertical-align: middle;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
