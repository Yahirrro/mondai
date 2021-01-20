import { DashboardLayout, DashboardSidebar } from '@components/dashboard'
import { QuizCard, QuizNote } from '@components/quiz'
import { ScreenLoading } from '@components/screen'
import { useAuthentication } from '@hook/auth'
import { QuizModel } from '@models'
import { useCollectionGroup, useDocument } from '@nandorojo/swr-firestore'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'

export default function Home(): React.ReactElement {
  const user = useAuthentication()

  const { data: played, error: errorPlayed } = useCollectionGroup<{
    id: string
    userId: string
    quizId: string
  }>(
    'participant',
    {
      where: ['userId', '==', user?.userId],
      orderBy: ['createdAt', 'desc'],
      limit: 6,
    },
    {}
  )
  errorPlayed && console.error(errorPlayed)
  return (
    <>
      <NextSeo title="あそんだクイズ" noindex={true} nofollow={true} />
      <DashboardLayout side={<DashboardSidebar />} changeOrder={true}>
        <h2 className="DashboardLayout_title">✔あそんだクイズ</h2>
        <p>上位6つを表示しています</p>

        <div className="DashboardQuizIndex">
          {!played && played?.length !== 0 && <ScreenLoading />}
          {played?.map((data) => {
            return <GetQuizCard key={data.quizId} quizId={data.quizId} />
          })}

          {played?.length == 0 && (
            <>
              <QuizNote title="😥あそんだクイズがありません!">
                <p>あなたがあそんだことのあるクイズがまだあリません😫</p>
                <p>いろんなクイズであそんでみてください!</p>
              </QuizNote>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  )
}

const GetQuizCard: React.FunctionComponent<{ quizId: string }> = (props) => {
  const { data: quiz } = useDocument<QuizModel>(`quiz/${props.quizId}`)
  return (
    <Link href={`/quiz/${props.quizId}`}>
      <a>
        <QuizCard
          style={{ width: '100%' }}
          title={quiz?.title}
          description={quiz?.description}
          emoji={quiz?.emoji}
        />
      </a>
    </Link>
  )
}
