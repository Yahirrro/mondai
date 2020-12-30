import { DashboardContext, PageContainer, ScreenError } from '@components/ui'
import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import React, { useState } from 'react'

type Props = {
  children?: React.ReactNode
  side?: React.ReactNode
  top?: React.ReactNode
}

export const DashboardLayout: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <PageContainer style={{ marginTop: '100px' }}>
        {props.top}
        <div className="DashboardGrid">
          <aside>{props.side}</aside>
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
