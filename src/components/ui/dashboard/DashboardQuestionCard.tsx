import { QuestionModel, QuizModel } from '@models'
import { DashboardContext, PageButton } from '@components/ui'
import React, { useContext } from 'react'
import Link from 'next/link'

type Props = {
  index: number
  quiz: QuizModel
  question: QuestionModel
}

export const DashboardQuestionCard: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <>
      <article key={props.question.id} className="DashboardQuestionCard">
        <div className="DashboardQuestionCard_info">
          <p>{`${props.index + 1}問目`}</p>
          <h2 className="DashboardQuestionCard_title">
            {props.question?.title}
          </h2>
        </div>
        <div className="DashboardQuestionCard_button">
          <Link
            href={`/dashboard/quiz/${props.quiz.id}/question/${props.question.id}`}>
            <PageButton style={{ minWidth: '150px' }}>編集する</PageButton>
          </Link>
        </div>
        {/* {props.question?.choice.map((choice, index) => {
            return (
              <label
                key={choice.title}
                className={`DashboardQuestionSelect${
                  props.question.answer == index
                    ? ' DashboardQuestionSelect-correctAnswer'
                    : ''
                }`}>
                <h3 className="DashboardQuestionSelect_title">
                  {choice.title}
                </h3>
                <input
                  className="DashboardQuestionSelect_input"
                  type="radio"
                  name={`questionId${props.question.id}`}
                  value={index}
                  defaultChecked={props.question.answer == index}
                />
              </label>
            )
          })} */}
        <style jsx>
          {`
            .DashboardQuestionCard {
              display: grid;
              grid-template-columns: 1fr 150px;
              gap: 30px;
              padding: 40px 30px;
              border-radius: 30px;
              background: #ffffff;
              &_info,
              &_body {
                p,
                h2 {
                  margin: 0;
                }
              }
              &_button {
                align-self: center;
              }
              & + & {
                margin-top: 20px;
              }
            }
          `}
        </style>
      </article>
    </>
  )
}
