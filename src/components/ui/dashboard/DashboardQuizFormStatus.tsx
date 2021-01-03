import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PageButton, QuizNote, IconLoading } from '@components/ui'
import { getIdToken } from '@lib/api'
import { useDashboardQuizUI } from '@hook/dashboard'

export const DashboardQuizFormStatus: React.FunctionComponent = () => {
  const router = useRouter()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()

  const [errorMsg, setErrorMsg] = useState<string>(null)
  const [apiLoading, setApiLoading] = useState<boolean>(false)

  const submit = async () => {
    const data = async (): Promise<{ status: string; message: string }> => {
      try {
        setApiLoading(true)
        const data = await fetch(
          `/api/quiz/toWaiting?quizId=` + router.query.quizId,
          {
            headers: { authorization: 'Bearer ' + (await getIdToken()) },
          }
        )
        setApiLoading(false)
        return data.json()
      } catch (error) {
        console.log(error)
      }
    }
    setErrorMsg((await data()).message as string)
    setDashboardQuizUI({ type: dashboardQuizUI.type, open: false })
    return
  }

  return (
    <QuizNote title="😆クイズをあそぶ!" style={{ padding: 0 }}>
      <p>
        クイズをみんなであそべる、<strong>👻クイズ大会</strong>
        を開く準備をはじめます！
      </p>
      <p>
        🛑注意:
        <strong> ボタンを押してから🚫クイズの編集はできなくなります</strong>
      </p>

      <PageButton
        buttontype="big"
        icon={apiLoading ? <IconLoading style={{ stroke: 'white' }} /> : null}
        style={{
          width: '100%',
          marginTop: '40px',
          color: 'white',
          backgroundColor: 'var(--mainPrimaryColor)',
        }}
        onClick={submit}>
        クイズをあそぶ!
      </PageButton>

      {errorMsg && (
        <div
          style={{
            marginTop: '15px',
            width: '100%',
            color: 'rgba(255,0,0,0.6)',
          }}>
          {errorMsg}
        </div>
      )}
    </QuizNote>
  )
}
