import { IconAdd, PageButton } from '@components/ui'
import { QuizCard, QuizNote } from '@components/quiz'
import { ScreenLoading } from '@components/screen'
import { DashboardLayout, DashboardSidebar } from '@components/dashboard'
import { useAuthentication } from '@hook/auth'
import { useDashboardQuizUI } from '@hook/dashboard'
import { QuizModel, TopicModel } from '@models'
import { fuego, useCollection } from '@nandorojo/swr-firestore'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { TopicCard } from '@components/topic'
import { TopicSlider } from '@components/topic/TopicSlider'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getTopics } from '@lib/api'
import { useRouter } from 'next/router'

type Props = {
  topics: Array<TopicModel>
}

export default function Home(props: Props): React.ReactElement {
  const user = useAuthentication()
  const router = useRouter()
  const { setDashboardQuizUI } = useDashboardQuizUI()

  const { data: quizzes } = useCollection<QuizModel>(user?.userId && `quiz`, {
    where: [
      ['permission.owner', 'array-contains', user?.userId],
      ['currentStatus', '!=', 'archive'],
    ],
  })

  useEffect(() => {
    if (router.query.create == '1') {
      setDashboardQuizUI({
        type: 'createQuiz',
        open: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.create])

  return (
    <>
      <NextSeo title="つくっているクイズ" />
      <DashboardLayout
        side={<DashboardSidebar />}
        changeOrder={true}
        disableOverflow>
        {props.topics !== null && (
          <section className="DashboardLayout_section">
            <h2 className="DashboardLayout_title">👶つくるのにおすすめ</h2>
            <TopicSlider topics={props.topics} />
          </section>
        )}

        <section className="DashboardLayout_section">
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
        </section>
      </DashboardLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      topics: JSON.parse(JSON.stringify(await getTopics())),
    },
    revalidate: 3600,
  }
}
