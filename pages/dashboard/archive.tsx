import { DashboardLayout, DashboardSidebar } from '@components/dashboard'
import { QuizCard } from '@components/quiz'
import { ScreenLoading } from '@components/screen'
import { useAuthentication } from '@hook/auth'
import { QuizModel } from '@models'
import { useCollection } from '@nandorojo/swr-firestore'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'

export default function Home(): React.ReactElement {
  const user = useAuthentication()

  const { data: quizzes } = useCollection<QuizModel>(user?.userId && `quiz`, {
    where: [
      ['permission.owner', 'array-contains', user?.userId],
      ['currentStatus', '==', 'archive'],
    ],
  })
  return (
    <>
      <NextSeo title="これまでに作ったクイズ" />
      <DashboardLayout side={<DashboardSidebar />}>
        <h2 className="DashboardLayout_title">💨これまでに作ったクイズ</h2>

        <div className="DashboardQuizIndex">
          {!quizzes && <ScreenLoading />}
          {quizzes?.map((data) => {
            return (
              <Link key={data.id} href={`/dashboard/quiz/${data.id}`}>
                <a>
                  <QuizCard
                    style={{ width: '100%' }}
                    title={data.title}
                    description={data.description}
                    emoji={data.emoji}
                  />
                </a>
              </Link>
            )
          })}
        </div>
      </DashboardLayout>
    </>
  )
}
