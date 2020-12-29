import { DashboardContext, PageContainer, ScreenError } from '@components/ui'
import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import React, { useState } from 'react'

type Props = {
  quizId: string
  children?: React.ReactNode
}

export const DashboardLayout: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <PageContainer style={{ marginTop: '100px' }}>
        <div className="DashboardGrid">
          <aside></aside>
          <div>{props.children}</div>
        </div>
      </PageContainer>

      <style jsx>
        {`
          .DashboardGrid {
            display: grid;
            gap: 100px;
            grid-template-columns: 300px 1fr;
            @media (max-width: 1100px) {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </>
  )
}
