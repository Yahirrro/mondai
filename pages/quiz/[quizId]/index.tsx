import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { QuestionModel, QuizModel } from '@models'
import { PageTitle } from '@components/ui'
import React, { useState } from 'react'
import { QuestionCard } from '@components/ui'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { ParsedUrlQuery } from 'querystring'

type Props = {
  params: ParsedUrlQuery
}

export default function Home(props: Props): React.ReactElement {
  const [value, setValue] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const { data: quiz } = useDocument<QuizModel>(`quiz/${props.params.quizId}`, {
    listen: true,
  })
  const { data: question } = useCollection<QuestionModel>(
    `quiz/${props.params.quizId}/question`,
    {
      listen: true,
    }
  )

  if (!quiz || !question) return <div>loading</div>

  // console.log(quiz)
  // console.log(question)
  console.log(value)

  const submitAnswer = (event) => {
    event.preventDefault()
    console.log({
      answerId: value,
      questionId: question[quiz.currentQuestion].id,
      userId: '',
    })
    setIsAnswered(true)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {}

      <div>
        <PageTitle title={quiz.title}></PageTitle>
        <p>{quiz.description}</p>
      </div>

      <div>
        {quiz.currentStatus == 'waiting' && (
          <>
            <h2>開始を待っています</h2>
          </>
        )}

        {quiz.currentStatus == 'archive' && (
          <>
            <h2>すでに終了しているクイズです</h2>
          </>
        )}

        {quiz.currentStatus == 'open' && (
          <QuestionCard
            title={question[quiz.currentQuestion]?.title}
            description="回答を選択してください">
            {!isAnswered ? (
              //回答前
              <form onSubmit={submitAnswer}>
                <div className="QuestionSelect">
                  {question[quiz.currentQuestion].choice.map((data, index) => {
                    return (
                      <label key={index} className="QuestionSelect_input">
                        <input
                          type="radio"
                          name={question[quiz.currentQuestion].title}
                          value={data.title}
                          onChange={() => {
                            setValue(
                              question[quiz.currentQuestion].choice.indexOf(
                                data
                              )
                            )
                          }}></input>
                        {index + 1 + ' ' + data.title}
                      </label>
                    )
                  })}
                  <style jsx>
                    {`
                      .QuestionSelect {
                        display: grid;
                        gap: 10px;
                        margin: 2rem 0;
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
                </div>

                <button className="QuestionCard_button" type="submit">
                  決定
                </button>
              </form>
            ) : (
              // 回答済み
              <div>メイン回答者が回答するのを待っています...</div>
            )}
          </QuestionCard>
        )}

        {quiz.currentStatus == 'answer' && (
          <>
            <h2>{question[quiz.currentQuestion].title}の正解は</h2>
            <p>
              {
                question[quiz.currentQuestion].choice[
                  question[quiz.currentQuestion].answer
                ].title
              }
            </p>

            <p>次の問題へ進みます...</p>
          </>
        )}
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
