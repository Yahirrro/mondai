import { DashboardLayout, DashboardSidebar } from '@components/dashboard'
import { QuizCard, QuizNote } from '@components/quiz'
import { ScreenLoading } from '@components/screen'
import { IconAdd, PageButton } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { useDashboardQuizUI } from '@hook/dashboard'
import { QuizModel } from '@models'
import { useCollection } from '@nandorojo/swr-firestore'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'

export default function Home(): React.ReactElement {
  const user = useAuthentication()
  const { setDashboardQuizUI } = useDashboardQuizUI()

  const { data: quizzes } = useCollection<QuizModel>(user?.userId && `quiz`, {
    where: [
      ['permission.owner', 'array-contains', user?.userId],
      ['currentStatus', '==', 'archive'],
      ['playagain.isPlayagain', '==', false],
    ],
  })
  return (
    <>
      <NextSeo title="これまでに作ったクイズ" noindex={true} nofollow={true} />
      <DashboardLayout side={<DashboardSidebar />} changeOrder={true}>
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

          {quizzes?.length == 0 && (
            <>
              <QuizNote title="😥クイズがまだありません!">
                <p>あなたがつくっているクイズがまだあリません😫</p>
                <p>いますぐクイズをつくってみませんか🤩</p>
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
              </QuizNote>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  )
}
