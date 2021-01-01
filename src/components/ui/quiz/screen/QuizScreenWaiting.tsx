import { QuizButton, QuizContext } from '@components/ui'
import React, { useContext } from 'react'

export const QuizScreenWaiting: React.FunctionComponent = () => {
  const { goStatusOpenScreen, isApiLoading, isMainAnswer } = useContext(
    QuizContext
  )
  return (
    <>
      <div>
        <h2>開始を待っています</h2>
        <div
          style={{
            textAlign: 'right',
            marginTop: 'var(--mainNormalPaddingSize)',
          }}>
          {isMainAnswer() && (
            <QuizButton
              text="はじめる"
              isLoading={isApiLoading}
              onClick={() => goStatusOpenScreen()}
            />
          )}
        </div>
      </div>
    </>
  )
}
