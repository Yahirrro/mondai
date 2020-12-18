import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { QuestionModel, QuizModel } from '@models'
import { PageTitle } from '@components/ui'
import React, { useState } from 'react'
import { QuestionCard } from '@components/ui'

type Props = {
  quiz: QuizModel
  questions: Array<QuestionModel>
}

export default function Home(props: Props): React.ReactElement {
  const [value, setValue] = useState('')
  const [, setIsSelected] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(value)
    setIsSelected(true)
    alert(`Submitting Name ${value}`)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <PageTitle title={props.quiz.title}></PageTitle>
        <p>{props.quiz.description}</p>
      </div>

      <div>
        {props.quiz.currentStatus == 'waiting' && (
          <>
            <h2>開始を待っています</h2>
          </>
        )}

        {props.quiz.currentStatus == 'archive' && (
          <>
            <h2>すでに終了しているクイズです</h2>
          </>
        )}

        {props.quiz.currentStatus == 'open' && (
          <QuestionCard
            title={props.questions[props.quiz.currentQuestion].title}
            description="回答を選択してください">
            <form onSubmit={handleSubmit}>
              <div className="QuestionSelect">
                {props.questions[props.quiz.currentQuestion].choice.map(
                  (question, index) => {
                    return (
                      <label key={index} className="QuestionSelect_input">
                        <input
                          type="radio"
                          name={
                            props.questions[props.quiz.currentQuestion].title
                          }
                          value={question.title}
                          onChange={(event) => {
                            setValue(event.target.value)
                          }}></input>
                        {index + 1 + ' ' + question.title}
                      </label>
                    )
                  }
                )}
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
          </QuestionCard>
        )}

        {props.quiz.currentStatus == 'answer' && (
          <>
            <h2>{props.questions[props.quiz.currentQuestion].title}の正解は</h2>
            <p>
              {
                props.questions[props.quiz.currentQuestion].choice[
                  props.questions[props.quiz.currentQuestion].answer
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

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
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
        currentStatus: 'open',
        currentQuestion: 0,
      },
      questions: [
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
