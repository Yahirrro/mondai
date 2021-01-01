import { DashboardLayout, PageButton, PageCard, QuizCard } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { useDashboardQuizUI } from '@hook/dashboard'
import { QuizModel } from '@models'
import { useCollection } from '@nandorojo/swr-firestore'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'

export default function Home(): React.ReactElement {
  const user = useAuthentication()
  const { setDashboardQuizUI } = useDashboardQuizUI()

  const { data: quiz } = useCollection<QuizModel>(`quiz`, {
    where: [
      'permission',
      'array-contains-any',
      [{ userId: user?.userId, permission: 'owner' }],
    ],
    listen: true,
  })
  console.log(quiz)
  return (
    <>
      <NextSeo title="ダッシュボード" />
      <DashboardLayout
        side={
          <>
            <PageCard title={user?.userName} description="ユーザー">
              <></>
            </PageCard>
            <PageButton
              style={{ width: '100%', marginTop: '20px' }}
              onClick={() =>
                setDashboardQuizUI({
                  type: 'createQuiz',
                  open: true,
                })
              }>
              クイズをつくる
            </PageButton>
          </>
        }>
        <h2>げんざいのくいずいちらん</h2>
        <div className="DashboardQuizIndex">
          {quiz?.map((data) => {
            return (
              <Link key={data.title} href={`/dashboard/quiz/${data.id}`}>
                <a>
                  <QuizCard
                    style={{ width: '100%' }}
                    title={data.title}
                    description={data.description}
                    icon={data.icon}
                  />
                </a>
              </Link>
            )
          })}
        </div>
      </DashboardLayout>
      <style jsx>
        {`
          .DashboardFlex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .DashboardQuizIndex {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
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
