import { useContext } from 'react'

import { QuizCard, QuizBadge, QuizContext } from '@components/ui'

export const QuizPageHeader: React.FunctionComponent = () => {
  const { quiz } = useContext(QuizContext)

  return (
    <>
      <header className="QuizPageHeader">
        <QuizCard
          title={quiz.title}
          description={quiz.description}
          emoji={quiz.emoji}
        />
        <div className="QuizPageHeader_badge">
          <QuizBadge text={quiz.currentStatus}></QuizBadge>
          <QuizBadge text="○人参加中"></QuizBadge>
        </div>
        <style jsx>
          {`
            .QuizPageHeader {
              position: relative;
              z-index: 1;
              width: fit-content;
              padding: var(--mainNormalPaddingSize);
              display: grid;
              gap: 15px;
              grid-template-rows: 1fr 30px;
              &_badge {
                display: flex;
                flex-flow: wrap;
                height: 30px;
              }
              &:before {
                content: '';
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                width: 70vw;
                height: 250px;
                background: var(--mainAccentColor);
                background-size: auto auto;
                background-image: var(--mainBackgroundPattern);
                border-bottom-right-radius: 124px;
                @media (max-width: 750px) {
                  height: 189px;
                }
              }
            }
          `}
        </style>
      </header>
    </>
  )
}
