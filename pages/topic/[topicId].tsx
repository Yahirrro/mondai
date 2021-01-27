import { NextSeo } from 'next-seo'

import { ParsedUrlQuery } from 'querystring'

import { PageButton, PageContainer } from '@components/ui'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getQuizByTopic, getTopic } from '@lib/api'
import { QuizModel, TopicModel } from '@models'
import React from 'react'
import { TopicCard } from '@components/topic'

import { NotionRenderer } from 'react-notion'
import 'react-notion/src/styles.css'
import Link from 'next/link'
import { ScreenError } from '@components/screen'
import { QuizCard } from '@components/quiz'
import { PageAd } from '@components/ad'

type Props = {
  params: ParsedUrlQuery
  topic: TopicModel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockMap: any
  quizzes: Array<QuizModel>
}

export default function Home(props: Props): React.ReactElement {
  if (props.topic == null) return <ScreenError code={404} />
  return (
    <>
      <NextSeo
        title={props.topic?.title}
        description={props.topic?.description}
      />

      <PageContainer style={{ maxWidth: '800px' }}>
        <header className="TopicIcon"></header>
        <article className="TopicContent">
          <TopicCard topic={props.topic} isBig />
          <div className="TopicContent_body">
            {props.blockMap && <NotionRenderer blockMap={props.blockMap} />}
            <Link href={`/dashboard?create=1&topicId=${props.topic.id}`}>
              <a>
                <PageButton
                  buttontype="big"
                  style={{
                    marginTop: '30px',
                    width: '100%',
                  }}>
                  {props.topic.title}をつくる
                </PageButton>
              </a>
            </Link>
          </div>
        </article>

        {props.quizzes.length > 0 && (
          <section className="TopicMoreUseQuiz">
            <h2>🎈人気のクイズ</h2>
            <div className="TopicMoreUseQuiz_quiz">
              {props.quizzes.map((data) => {
                return (
                  <Link href={`/quiz/${data.id}`} key={data.id}>
                    <a>
                      <QuizCard
                        title={data.title}
                        description={data.description}
                        emoji={data.emoji}
                        style={{ width: '100%' }}
                      />
                    </a>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {props.topic.isCampaign == false && <PageAd type="normal" />}
      </PageContainer>
      <style jsx>
        {`
          :global(.notion) {
            font-family: var(--mainFontFamily);
          }
          .TopicMoreUseQuiz {
            margin-top: var(--mainNormalPaddingSize);
            &_quiz {
              display: grid;
              grid-template-columns: 1fr;
              gap: 20px;
              @media (max-width: 750px) {
                gap: 15px;
              }
            }
          }
          .TopicIcon {
            position: relative;
            margin-right: auto;
            margin-left: auto;
            margin-bottom: 30px;
            width: 82px;
            height: 82px;
            background-color: var(--mainAccentColor);
            border-radius: 50%;

            display: flex;
            align-items: center;
            justify-content: center;
            &:before {
              font-size: 56px;
              font-weight: bold;
              color: white;
              content: '#';
            }
            &:after {
              font-size: 42px;
              font-weight: bold;
              position: absolute;
              content: 'Quiz Topic';
              width: 300px;
              text-align: center;
              letter-spacing: -0.2rem;
              opacity: 0.5;
            }
          }
          .TopicContent {
            word-break: break-all;
            border-radius: 30px 0 0 30px;
            &_title {
              margin-top: 0;
              font-size: 3rem;
              @media (max-width: 750px) {
                font-size: 2.5rem;
              }
            }
            :global(p:first-of-type) {
              margin-top: 0;
            }
            :global(p:last-of-type) {
              margin-bottom: 0;
            }
            :global(a) {
              color: var(--mainPrimaryColor);
              font-weight: bold;
            }
            :global(h2) {
              margin-top: 2.5rem;
            }
            :global(.TopicCard-big) {
              border-radius: 30px 30px 0 0;
              padding-top: 30px;
              padding-bottom: 30px;
            }
          }
          .TopicContent_body {
            background-color: white;
            padding: 30px 20px;
            border-radius: 0 0 30px 30px;
            @media (max-width: 750px) {
              padding: 30px 15px;
            }
          }
        `}
      </style>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const topic = await JSON.parse(
    JSON.stringify(await getTopic(params.topicId as string))
  )
  if (topic == null)
    return {
      props: { topic: null, blockMap: null, quizzes: null },
      revalidate: 3600,
    }
  const notionBlockMap = topic.notionURL
    ? await fetch(
        'https://notion-api.splitbee.io/v1/page/' + topic.notionURL
      ).then((res) => res.json())
    : null
  const quizzes = await getQuizByTopic(params.topicId as string)

  return {
    props: {
      topic: topic,
      blockMap: notionBlockMap,
      quizzes: JSON.parse(JSON.stringify(quizzes)),
    },
    revalidate: 3600,
  }
}
