import React, { useContext, useEffect } from 'react'
import {
  DashboardMessagePercent,
  DashboardQuizContext,
  DashboardMessageForm,
} from '@components/dashboard'
import { useCollection } from '@nandorojo/swr-firestore'
import { QuizNote } from '@components/quiz'
import { useDashboardQuizUI } from '@hook/dashboard'

import { useWindowSize } from '@react-hook/window-size/throttled'
import { useRouter } from 'next/router'

export const DashboardQuizScreenMessage: React.FunctionComponent = () => {
  const router = useRouter()
  const [width] = useWindowSize()
  const { quiz } = useContext(DashboardQuizContext)
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const { data: message } = useCollection<{
    percent: number
    message: string
  }>(`quiz/${quiz.id}/message`, {
    listen: true,
  })
  useEffect(() => {
    setDashboardQuizUI({
      type: dashboardQuizUI.type,
      open: false,
      optional: {
        messagePercent: 0,
        messageData: message?.find((msg) => msg.percent == 0),
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.quizId])

  useEffect(() => {
    if (
      message?.some(
        (data) => data.percent == dashboardQuizUI.optional?.messagePercent
      ) == false &&
      !isWindowBreakPoint()
    ) {
      setDashboardQuizUI({
        type: dashboardQuizUI.type,
        open: false,
        optional: {
          messagePercent: 0,
          messageData: message?.find((msg) => msg.percent == 0),
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  useEffect(() => {
    if (
      !isWindowBreakPoint() &&
      dashboardQuizUI.optional?.messageData == null &&
      message
    ) {
      setDashboardQuizUI({
        type: dashboardQuizUI.type,
        open: false,
        optional: {
          messagePercent: 0,
          messageData: message?.find((msg) => msg.percent == 0),
        },
      })
      if (isWindowBreakPoint()) {
        setDashboardQuizUI({
          type: dashboardQuizUI.type,
          open: false,
          optional: {
            messagePercent: null,
            messageData: null,
          },
        })
      }
    }
    if (
      isWindowBreakPoint() &&
      dashboardQuizUI.optional?.messageData !== null
    ) {
      setDashboardQuizUI({
        type: dashboardQuizUI.type,
        open: false,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  const isWindowBreakPoint = () => {
    return width < 900
  }

  return (
    <>
      <h2 style={{ marginTop: 0 }}>正解率メッセージ</h2>

      <div className="DashboardQuizScreenMessage">
        <ul className="DashboardQuizScreenMessage_selector">
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((data) => {
            const msg = message?.some((msg) => msg.percent == data)
            const messageData = message?.find((msg) => msg.percent == data)
            return (
              <DashboardMessagePercent
                key={data}
                percent={data * 100}
                exist={msg}
                selected={data === dashboardQuizUI.optional?.messagePercent}
                onClick={() => {
                  setDashboardQuizUI({
                    type: 'editMessage',
                    open: isWindowBreakPoint(),
                    optional: {
                      messageData: messageData,
                      messagePercent: data,
                    },
                  })
                }}
              />
            )
          })}
        </ul>

        {isWindowBreakPoint() == false && <DashboardMessageForm />}
        <QuizNote
          title="🤔正解率メッセージってなに?"
          style={{ marginTop: '40px' }}>
          <p>
            問題がすべて終了したあとに、
            <strong>条件に当てはまるメッセージ</strong>
            を表示することが出来ます😎
          </p>
          <p>
            たとえば、🍵診断メーカーのように使ったり、💗褒めるメッセージを入れてみたり、楽しい使いみちを考えてみてください😆
          </p>
        </QuizNote>

        <style jsx>
          {`
            .DashboardQuizScreenMessage {
              &_selector {
                position: relative;
                display: flex;
                list-style-type: none;
                justify-content: space-between;
                padding: 0;
                margin: 0;
                padding-top: 45px;
                &:before {
                  position: absolute;
                  content: '';
                  width: calc(100% - 80px);
                  height: 5px;
                  background-color: #dbdbdb;
                  top: 13px;
                  left: 50%;
                  transform: translateX(-50%);
                  border-radius: 3px;
                }
                @media (max-width: 1300px) {
                  overflow-x: auto;
                }
                @media (max-width: 900px) {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 10px;
                  margin-top: 5px;
                  padding-left: 50px;
                  padding-top: 0;
                  &:before {
                    position: absolute;
                    content: '';
                    width: 5px;
                    height: calc(100% - 80px);
                    top: 50%;
                    transform: translateY(-50%);
                    left: 13px;
                  }
                }
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
