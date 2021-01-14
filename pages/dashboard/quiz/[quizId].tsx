import {
  DashboardQuizLayout,
  DashboardQuizContext,
  DashboardCard,
  DashboardCardFlow,
} from '@components/dashboard'
import { ScreenError, ScreenLoading } from '@components/screen'
import { PageButton, PageNumber, PageShare } from '@components/ui'
import { useDashboardQuizUI } from '@hook/dashboard'
import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DashboardQuizScreenDetail = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizScreenDetail)
)
const DashboardQuizScreenQuestion = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizScreenQuestion)
)
const DashboardQuizScreenMessage = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizScreenMessage)
)

export default function Home(): React.ReactElement {
  const router = useRouter()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const [pageType, setPageType] = useState<
    'detail' | 'question' | 'permission' | 'message'
  >('detail')

  useEffect(() => {
    setDashboardQuizUI({
      type: dashboardQuizUI.type,
      open: false,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.quizId])

  const {
    data: quiz,
    update: updateQuiz,
    error: errorQuiz,
  } = useDocument<QuizModel>(
    router.query.quizId ? `quiz/${router.query.quizId}` : null
  )
  const {
    data: questions,
    error: errorQuestions,
  } = useCollection<QuestionModel>(
    router.query.quizId ? `quiz/${router.query.quizId}/question` : null,
    {
      listen: true,
    }
  )

  if (errorQuiz || errorQuestions) return <ScreenError code={404} />
  if (quiz?.exists == false) return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizContext.Provider
        value={{
          quiz,
          updateQuiz,
          questions,
          dashboardQuizUI,
          setDashboardQuizUI,
          pageType,
          setPageType,
        }}>
        <DashboardQuizLayout
          disableSidebar={quiz?.currentStatus !== 'creating'}>
          {!quiz?.exists ? (
            <ScreenLoading />
          ) : (
            <>
              {quiz?.currentStatus == 'creating' && (
                <>
                  {pageType == 'detail' && <DashboardQuizScreenDetail />}
                  {pageType == 'question' && <DashboardQuizScreenQuestion />}
                  {pageType == 'message' && <DashboardQuizScreenMessage />}
                </>
              )}

              {quiz?.currentStatus == 'waiting' && (
                <>
                  <DashboardCard
                    title="クイズ大会をはじめましょう😆"
                    button={
                      <Link href={`/quiz/${quiz.id}`}>
                        <a>
                          <PageButton
                            buttontype="big"
                            style={{ width: '100%' }}>
                            このクイズであそぶ
                          </PageButton>
                        </a>
                      </Link>
                    }>
                    <DashboardCardFlow>
                      <div className="DashboardCardFlow_flex">
                        <img
                          className="DashboardInviteQR"
                          src={`https://api.qrserver.com/v1/create-qr-code/?data=https://mondai.page/quiz/${quiz?.id}&size=160x160`}
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
                        url={`https://mondai.page/quiz/${quiz?.id}`}
                      />
                    </DashboardCardFlow>
                    <DashboardCardFlow>
                      <p className="DashboardCardFlow_description">
                        ページで「はじめる」をおす！
                      </p>
                    </DashboardCardFlow>
                  </DashboardCard>
                </>
              )}
              {quiz?.currentStatus == 'archive' && (
                <>
                  <DashboardCard
                    title="クイズ大会おつかれさまでした😌"
                    button={
                      <Link href={`/quiz/${quiz.id}`}>
                        <a>
                          <PageButton
                            buttontype="big"
                            style={{ width: '100%' }}>
                            クイズページへ
                          </PageButton>
                        </a>
                      </Link>
                    }>
                    <p>
                      クイズ大会おつかれさまでした！
                      今回のクイズ大会はいかがでしたか？また、mondaiをつかってクイズ大会をつくってみてください😆
                    </p>
                    <div className="DashboardCardGrid">
                      <div className="DashboardCardGridColumn">
                        <h3>参加者数</h3>
                        <PageNumber number={quiz?.allUser} unit="人" />
                      </div>
                      <div className="DashboardCardGridColumn">
                        <h3>すべて正解した人</h3>
                        <PageNumber
                          number={quiz?.allCorrectUser.length}
                          unit="人"
                        />
                      </div>
                    </div>
                    <p>クイズの結果はクイズページから見ることが出来ます!</p>
                  </DashboardCard>
                  {quiz?.permission.playagain && (
                    <>
                      <DashboardCard
                        title="クイズは再利用されています♻️"
                        button={
                          <Link href={`/quiz/${quiz.id}`}>
                            <a>
                              <PageButton
                                buttontype="big"
                                style={{ width: '100%' }}>
                                クイズページへ
                              </PageButton>
                            </a>
                          </Link>
                        }>
                        <DashboardCardFlow>
                          <div className="DashboardCardFlow_flex">
                            <img
                              style={{ marginRight: '0' }}
                              className="DashboardInviteQR"
                              src={`https://api.qrserver.com/v1/create-qr-code/?data=https://mondai.page/quiz/${quiz?.id}&size=160x160`}
                            />
                          </div>
                          <p className="DashboardCardFlow_description">
                            クイズページを共有して
                            <br />
                            みんなにあそんでもらおう!
                          </p>
                          <PageShare
                            style={{ marginTop: '20px' }}
                            text={quiz?.title}
                            url={`https://mondai.page/quiz/${quiz?.id}`}
                          />
                        </DashboardCardFlow>
                        <DashboardCardFlow>
                          <p className="DashboardCardFlow_description">
                            ページで「このクイズであそぶ!」をおす！
                          </p>
                        </DashboardCardFlow>
                      </DashboardCard>
                    </>
                  )}
                </>
              )}

              <style jsx>
                {`
                  .DashboardCardGrid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                    @media (max-width: 750px) {
                      grid-template-columns: 1fr;
                    }
                  }
                  .DashboardCardGridColumn {
                    padding: 30px;
                    background-color: var(--mainBackgroundColor);
                    border-radius: 30px;
                    h3 {
                      margin: 0;
                    }
                    :global(.PageNumber_number) {
                      font-size: 64px;
                      line-height: 77px;
                      color: black;
                    }
                  }
                `}
              </style>
            </>
          )}
        </DashboardQuizLayout>
      </DashboardQuizContext.Provider>
    </>
  )
}
