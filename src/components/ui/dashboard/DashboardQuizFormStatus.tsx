import { useRouter } from 'next/router'
import React from 'react'
import { PageButton, QuizNote } from '@components/ui'

export const DashboardQuizFormStatus: React.FunctionComponent = () => {
  const router = useRouter()
  return (
    <QuizNote title="クイズをあそぶ!" style={{ padding: 0 }}>
      <p>ボタンを押すと、クイズをみんなであそべるようになります!</p>
      <p>
        ⚠️ボタンを押してからクイズの編集はできなくなりますので、ご注意ください
      </p>
      <PageButton buttontype="big" style={{ width: '100%', marginTop: '40px' }}>
        クイズをあそぶ!
      </PageButton>
    </QuizNote>
  )
}
