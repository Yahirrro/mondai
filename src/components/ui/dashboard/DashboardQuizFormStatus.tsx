import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { PageButton, QuizNote } from '@components/ui'
import { useQuizData } from '@hook/dashboard'
import { useDocument } from '@nandorojo/swr-firestore'
import { QuizModel } from '@models'
import { getIdToken } from '@lib/api'
import useSWR from 'swr'

export const DashboardQuizFormStatus: React.FunctionComponent = () => {
  const router = useRouter()

  const [errorMsg, setErrorMsg] = useState<string>(null)

  const submit = async () => {
    const data = async (): Promise<{ status: string; message: string }> => {
      try {
        const data = await fetch(
          `/api/quiz/toWaiting?quizId=` + router.query.quizId,
          {
            headers: { authorization: 'Bearer ' + (await getIdToken()) },
          }
        )
        return data.json()
      } catch (error) {
        console.log(error)
      }
    }
    setErrorMsg((await data()).message as string)
    return
  }

  return (
    <QuizNote title="クイズをあそぶ!" style={{ padding: 0 }}>
      <p>ボタンを押すと、クイズをみんなであそべるようになります!</p>
      <p>
        ⚠️ボタンを押してからクイズの編集はできなくなりますので、ご注意ください
      </p>

      <PageButton
        buttontype="big"
        style={{ width: '100%', marginTop: '40px' }}
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
