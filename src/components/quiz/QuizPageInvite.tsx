import { useContext } from 'react'

import { QuizQR, QuizContext } from '@components/quiz'

export const QuizPageInvite: React.FunctionComponent = () => {
  const { quiz } = useContext(QuizContext)

  return (
    <>
      <aside className="QuizPageInvite">
        <QuizQR
          url={`https://dev.mondai.page/quiz/${quiz.id}`}
          code={quiz.inviteCode}
        />
        <style jsx>
          {`
            .QuizPageInvite {
              position: absolute;
              z-index: 1;
              top: var(--mainNormalPaddingSize);
              right: var(--mainNormalPaddingSize);
              @media (max-width: 750px) {
                display: none;
              }
            }
          `}
        </style>
      </aside>
    </>
  )
}
