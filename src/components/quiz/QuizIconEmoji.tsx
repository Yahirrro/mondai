import Twemoji from 'react-twemoji'

type Props = {
  emoji: string
  style?: React.CSSProperties
}

export const QuizIconEmoji: React.FunctionComponent<Props> = (props) => {
  // console.log(props.emoji && Array.from(props.emoji)[0])
  // console.log(props.emoji && [...props.emoji])
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
              font-size: 0%;
              &::first-letter {
                background-color: white;
                font-size: 100%;
              }
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
