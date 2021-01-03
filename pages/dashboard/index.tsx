import {
  DashboardLayout,
  IconAdd,
  IconFace,
  PageButton,
  PageCard,
  QuizCard,
  QuizNote,
  ScreenLoading,
} from '@components/ui'
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

  const { data: quizzes } = useCollection<QuizModel>(`quiz`, {
    where: [
      [
        'permission',
        'array-contains-any',
        [
          { userId: user?.userId, permission: 'owner' },
          { userId: user?.userId, permission: 'moderator' },
        ],
      ],
      ['currentStatus', '!=', 'archive'],
    ],
    listen: true,
  })
  return (
    <>
      <NextSeo title="ダッシュボード" />
      <DashboardLayout
        side={
          <>
            <PageCard
              icon={<IconFace />}
              title={user?.userName}
              description="ユーザー"
            />
            <PageButton
              buttontype="big"
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
          </>
        }>
        <h2 className="DashboardLayout_title">🎈つくっているクイズ</h2>
        <div className="DashboardQuizIndex">
          {!quizzes && <ScreenLoading />}
          {quizzes?.map((data) => {
            return (
              <Link key={data.title} href={`/dashboard/quiz/${data.id}`}>
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
