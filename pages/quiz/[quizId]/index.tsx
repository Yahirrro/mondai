import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { AnswerModel, QuestionModel, QuizModel } from '@components/models'
import {
  PageButton,
  QuestionSelectCard,
  QuestionTitle,
  QuizBadge,
  QuizCard,
} from '@components/ui'
import React, { useEffect, useState } from 'react'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { ParsedUrlQuery } from 'querystring'
import { useAuthentication } from '@components/hook/auth'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const user = useAuthentication()
  const [value, setValue] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const { data: quiz } = useDocument<QuizModel>(
    props.params.quizId ? `quiz/${props.params.quizId}` : null,
    {
      listen: true,
    }
  )
  const { data: question } = useDocument<QuestionModel>(
    quiz?.currentQuestion
      ? `quiz/${props.params.quizId}/question/${quiz?.currentQuestion}`
      : null,
    {
      listen: true,
    }
  )
  const { data: userAnswer, add: AddUserAnswer } = useCollection<AnswerModel>(
    user?.userId ? `quiz/${props.params.quizId}/answer` : null,
    {
      where: ['userId', '==', user?.userId],
      listen: true,
    }
  )

  useEffect(() => {
    console.log(quiz, question, userAnswer)
    if (userAnswer?.find((data) => data.questionId == question?.id)) {
      setIsAnswered(true)
    } else {
      setIsAnswered(false)
    }
  }, [userAnswer, question, quiz])

  if (!quiz?.exists || !question?.exists) return <div>loading</div>

  const submitAnswer = (event) => {
    event.preventDefault()
    if (value == null) return
    if (userAnswer?.find((data) => data.questionId == question?.id)) return
    AddUserAnswer({
      userId: user?.userId,
      answerId: value,
      questionId: question.id,
    })
    setIsAnswered(true)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          background: 'var(--mainBackgroundColor)',
          position: 'relative',
          minHeight: '100vh',
        }}>
        {/* ヘッダー */}
        <header className="QuizPageHeader">
          <QuizCard title={quiz.title} description={quiz.description} />
          <div className="QuizPageHeader_badge">
            <QuizBadge text="開催中"></QuizBadge>
            <QuizBadge text="○人参加中"></QuizBadge>
          </div>
          <style jsx>
            {`
              .QuizPageHeader {
                position: relative;
                z-index: 1;
                width: fit-content;
                padding: var(--mainNormalPaddingSize);
                display: grid;
                gap: 15px;
                grid-template-rows: 1fr 30px;
                &_badge {
                  display: flex;
                  height: 30px;
                  gap: 10px;
                }
                &:before {
                  content: '';
                  position: absolute;
                  z-index: -1;
                  top: 0;
                  left: 0;
                  width: 70vw;
                  height: 250px;
                  background: var(--mainAccentColor);
                  border-bottom-right-radius: 124px;
                  @media (max-width: 750px) {
                    height: 189px;
                  }
                }
              }
            `}
          </style>
        </header>

        {/* QRコード */}
        <aside className="QuizPageInvite">
          <h3 className="QuizPageInvite_title">いますぐ参加しよう</h3>
          <div className="QuizPageInvite_qr">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?data=${location.href}&size=100x100`}
              alt=""
            />
            <p>#12121</p>
          </div>
          <style jsx>
            {`
              .QuizPageInvite {
                position: absolute;
                z-index: 1;
                top: var(--mainNormalPaddingSize);
                right: var(--mainNormalPaddingSize);
                text-align: center;
                @media (max-width: 740px) {
                  display: none;
                }
                &_title {
                  display: inline-block;
                  padding: 10px 15px;
                  border-radius: 50px;
                  background: var(--mainAccentColor);
                  margin-top: 0;
                  margin-bottom: 15px;
                }
                &_qr {
                  display: block;
                  width: fit-content;
                  background-color: white;
                  padding: 20px;
                  border-radius: 20px;
                  margin: auto;
                  img {
                    width: 80px;
                    height: 80px;
                  }
                  p {
                    display: block;
                    margin-top: 5px;
                    margin-bottom: 0;
                    opacity: 0.3;
                    font-size: 20px;
                    line-height: 24px;
                    font-weight: bold;
                  }
                }
              }
            `}
          </style>
        </aside>

        <main className="QuizPageContent">
          <div>
            {quiz.currentStatus == 'waiting' && (
              <div>
                <h2>開始を待っています</h2>
              </div>
            )}

            {quiz.currentStatus == 'archive' && (
              <div>
                <h2>すでに終了しているクイズです</h2>
              </div>
            )}

            {quiz.currentStatus == 'open' && (
              <>
                <QuestionTitle title={question?.title}></QuestionTitle>
                {!isAnswered ? (
                  //回答前
                  <form onSubmit={submitAnswer}>
                    <div className="QuestionSelect">
                      {question.choice.map((data) => {
                        return (
                          <QuestionSelectCard
                            key={data.title}
                            title={data.title}>
                            <input
                              type="radio"
                              id={data.title}
                              name={question.title}
                              value={data.title}
                              onChange={() => {
                                setValue(question.choice.indexOf(data))
                              }}></input>
                          </QuestionSelectCard>
                        )
                      })}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <PageButton
                        text="解答する"
                        type="submit"
                        disabled={value == null}></PageButton>
                    </div>
                  </form>
                ) : (
                  // 回答済み
                  <div>メイン回答者が回答するのを待っています...</div>
                )}
              </>
            )}

            {quiz.currentStatus == 'answer' && (
              <div>
                <h2>{question.title}の正解は</h2>
                <p>{question.choice[question.answer].title}</p>

                <p>次の問題へ進みます...</p>
              </div>
            )}
          </div>

          <aside>
            {userAnswer !== undefined &&
              userAnswer.map((data) => {
                return <p key={data.questionId}>{data.questionId}</p>
              })}
          </aside>

          <style jsx>
            {`
              .QuizPageContent {
                display: grid;
                grid-template-columns: 1fr 300px;
                @media (max-width: 950px) {
                  grid-template-columns: 1fr;
                }
                gap: var(--mainNormalPaddingSize);
                padding: var(--mainNormalPaddingSize);
              }
              .QuestionSelect {
                display: grid;
                gap: var(--mainNormalPaddingSize);
                margin-top: calc(var(--mainNormalPaddingSize) * 1.5);
                margin-bottom: var(--mainNormalPaddingSize);
                grid-template-columns: repeat(
                  auto-fit,
                  [col-start] minmax(300px, 1fr) [col-end]
                );
                &_input {
                  cursor: pointer;
                  width: 100%;
                  height: 60px;
                  padding: 1rem 1rem;
                  border: 1px solid whitesmoke;
                }
              }
            `}
          </style>
        </main>
      </div>
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
  return {
    props: {
      params: params,
      quiz: {
        id: 'asd',
        title: 'クイズ',
        description: '加藤純一クイズ',
        permission: {
          owner: ['a'],
          moderator: ['a'],
          answer: 'a',
        },
        flow: ['asd1', 'asd2'],
        currentStatus: 'answer',
        currentQuestion: 0,
      },
      question: [
        {
          id: 'asd1',
          title: 'うんこちゃんの本名は？',
          answer: 1,
          choice: [
            {
              title: '加藤純一',
              description: 'string',
            },
            {
              title: '加藤純二',
              description: 'string',
            },
          ],
        },
        {
          id: 'asd2',
          title: 'asd2',
          answer: 0,
          choice: [
            {
              title: 'string',
              description: 'string',
            },
            {
              title: 'string',
              description: 'string',
            },
          ],
        },
      ],
    },
    revalidate: 60,
  }
}
