import { DashboardLayout } from '@components/ui'
import { GetStaticProps } from 'next'
import React from 'react'

export default function Home(): React.ReactElement {
  return (
    <>
      <DashboardLayout>
        <h2>クイズのタイトルとか説明文を変えるフォーム</h2>
      </DashboardLayout>
      <style jsx>
        {`
          .DashboardFlex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  }
}
