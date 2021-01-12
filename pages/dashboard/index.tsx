import { IconAdd, PageButton } from '@components/ui'
import { QuizCard, QuizNote } from '@components/quiz'
import { ScreenLoading } from '@components/screen'
import { DashboardLayout, DashboardSidebar } from '@components/dashboard'
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

  const { data: quizzes } = useCollection<QuizModel>(user?.userId && `quiz`, {
    where: [
      ['permission.owner', 'array-contains', user?.userId],
      ['currentStatus', '!=', 'archive'],
    ],
  })
  return (
    <>
      <NextSeo title="ダッシュボード" />
      <DashboardLayout side={<DashboardSidebar />}>
        <h2 className="DashboardLayout_title">🎈つくっているクイズ</h2>
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
        {quizzes?.length == 0 && (
          <>
            <QuizNote title="😥クイズがまだありません!">
              <p>あなたがつくっているクイズがまだあリません😫</p>
              <p>いますぐクイズをつくってみませんか🤩</p>
              <PageButton
                style={{ width: '100%', marginTop: '20px' }}
                icon={<IconAdd />}
                onClick={() =>
                  setDashboardQuizUI({
                    type: 'createQuiz',
                    open: true,
                  })
                }>
                クイズをつくる
              </PageButton>
            </QuizNote>
          </>
        )}
      </DashboardLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60,
  }
}
