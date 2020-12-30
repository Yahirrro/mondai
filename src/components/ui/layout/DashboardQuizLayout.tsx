import {
  DashboardLayout,
  DashboardQuestionCard,
  QuizCard,
} from '@components/ui'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { QuestionModel, QuizModel } from '@models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  quizId: string
  children?: React.ReactNode
}

export const DashboardQuizLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const { data: quiz } = useDocument<QuizModel>(
    props.quizId ? `quiz/${props.quizId}` : null,
    {
      listen: true,
    }
  )
  const { data: questions } = useCollection<QuestionModel>(
    router.pathname == '/dashboard/quiz/[quizId]/question/[questionId]'
      ? `quiz/${props.quizId}/question`
      : null,
    {
      listen: true,
    }
  )
  return (
    <>
      <DashboardLayout
        top={
          <div className="DashboardQuizLayout_header">
            <QuizCard
              title={quiz?.title}
              description={quiz?.description}
              icon={quiz?.icon}
            />
          </div>
        }
        side={
          <div className="DashboardQuizLayout_side">
            {router.pathname ==
              '/dashboard/quiz/[quizId]/question/[questionId]' && (
              <>
                {quiz?.flow.map((data, index) => {
                  const question = questions?.find(
                    (questions) => data == questions.id
                  )
                  if (!question) return
                  return (
                    <DashboardQuestionCard
                      key={question.id}
                      index={index}
                      quiz={quiz}
                      question={question}
                      type="small"
                    />
                  )
                })}
              </>
            )}
            <ul>
              <li>
                <Link href={`/dashboard/quiz/${props.quizId}`}>
                  <a>クイズの編集</a>
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/quiz/${props.quizId}/question`}>
                  <a>問題をつくる</a>
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/quiz/${props.quizId}/permission`}>
                  <a>権限を設定</a>
                </Link>
              </li>
            </ul>
          </div>
        }>
        {props.children}
      </DashboardLayout>
      <style jsx>
        {`
          .DashboardQuizLayout {
            &_header {
              margin-bottom: var(--mainNormalPaddingSize);
            }
            &_side {
              ul {
                display: grid;
                grid-template-rows: 50px;
                gap: 10px;
                list-style-type: none;
                padding: 0;
                li {
                  display: flex;
                  height: 50px;
                  align-items: center;
                  font-weight: bold;
                  font-size: 1.3rem;

                  &:before {
                    content: '';
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: var(--mainAccentColor);
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        `}
      </style>
    </>
  )
}
