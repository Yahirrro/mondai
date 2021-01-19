import {
  DashboardCard,
  DashboardCardFlow,
} from '@components/dashboard/DashboardCard'
import { QuizButton, QuizContext } from '@components/quiz'
import { TutorialQuizMainAnswer } from '@components/tutorial'
import { PageShare } from '@components/ui'
import { getDomain } from '@lib/api'
import React, { useContext } from 'react'

export const QuizScreenWaiting: React.FunctionComponent = () => {
  const { quiz, goStatusOpenScreen, isApiLoading, isMainAnswer } = useContext(
    QuizContext
  )
  return (
    <>
      {isMainAnswer() && <TutorialQuizMainAnswer />}
      <div>
        <h2>開始を待っています</h2>

        <DashboardCard
          title="クイズ大会をはじめましょう😆"
          style={{ marginTop: 'var(--mainNormalPaddingSize)' }}
          button={
            <div>
              {isMainAnswer() ? (
                <QuizButton
                  text="はじめる"
                  isLoading={isApiLoading}
                  onClick={() => goStatusOpenScreen()}
                  style={{
                    width: '100%',
                    minWidth: '100%',
                  }}
                />
              ) : (
                <QuizButton
                  text="はじめる"
                  disabled
                  style={{
                    width: '100%',
                    minWidth: '100%',
                  }}
                />
              )}
            </div>
          }>
          <DashboardCardFlow>
            <div className="DashboardCardFlow_flex">
              <img
                className="DashboardInviteQR"
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${getDomain()}/quiz/${
                  quiz?.id
                }&size=160x160`}
              />
              <div className="DashboardInviteCode">
                <h3>参加コード</h3>
                <p>{quiz?.inviteCode}</p>
              </div>
            </div>
            <p className="DashboardCardFlow_description">
              クイズ大会へ友達を招待!
              <br />
              もちろんひとりでもあそべます!
            </p>
            <PageShare
              style={{ marginTop: '20px' }}
              text={quiz?.title}
              url={`${getDomain()}/quiz/${quiz?.id}`}
            />
          </DashboardCardFlow>
          <DashboardCardFlow>
            <p className="DashboardCardFlow_description">「はじめる」をおす!</p>
          </DashboardCardFlow>
        </DashboardCard>
      </div>
    </>
  )
}
