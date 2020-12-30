import { QuestionModel, QuizModel } from '@models'
import { DashboardContext, PageButton } from '@components/ui'
import React, { useContext } from 'react'
import Link from 'next/link'

type Props = {
  index: number
  quiz: QuizModel
  question: QuestionModel
  type?: 'small'
}

export const DashboardQuestionCard: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <>
      <Link
        href={`/dashboard/quiz/${props.quiz.id}/question/${props.question.id}`}>
        <article
          key={props.question.id}
          className={`DashboardQuestionCard${
            props.type ? ` DashboardQuestionCard-${props.type}` : ''
          }`}>
          <div className="DashboardQuestionCard_info">
            <p>{`${props.index + 1}問目`}</p>
            <h2 className="DashboardQuestionCard_title">
              {props.question?.title}
            </h2>
          </div>
          {/* <div className="DashboardQuestionCard_button">
            <PageButton style={{ minWidth: '150px' }}>編集する</PageButton>
          </div> */}

          <style jsx>
            {`
              .DashboardQuestionCard {
                cursor: pointer;
                display: grid;
                grid-template-columns: 1fr;
                gap: 30px;
                padding: 40px 30px;
                border-radius: 30px;
                background: #ffffff;
                &-small {
                  border-radius: 20px;
                  padding: 20px;
                  .DashboardQuestionCard_title {
                    font-size: 1.2rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
                &_info,
                &_body {
                  overflow: hidden;
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
      </Link>
    </>
  )
}
