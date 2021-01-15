import { useContext } from 'react'

import { QuizCard, QuizBadge, QuizContext } from '@components/quiz'

export const QuizPageHeader: React.FunctionComponent = () => {
  const { quiz } = useContext(QuizContext)

  const status = () => {
    switch (quiz.currentStatus) {
      case 'waiting':
        return '開始を待っています'
      case 'open':
        return '問題出題中'
      case 'answer':
        return '答え表示中'
      case 'archive':
        return '終了しました'
    }
  }

  return (
    <>
      <header className={`QuizPageHeader`}>
        <QuizCard
          title={quiz?.title}
          description={quiz?.description}
          emoji={quiz?.emoji}
          playagain={quiz?.playagain?.isPlayagain}
          long={true}
        />
        <div className="QuizPageHeader_badge">
          <QuizBadge text={status()}></QuizBadge>
          <QuizBadge text={`${quiz.allUser}人参加`}></QuizBadge>
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
