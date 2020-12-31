import { DashboardLayout, PageModal, QuizCard } from '@components/ui'
import { useDocument } from '@nandorojo/swr-firestore'
import { QuizModel } from '@models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import React from 'react'
import { useDashboardQuizUI } from '@hook/dashboard'

const DashboardQuestionFormAdd = dynamic(() =>
  import('@components/ui').then((lib) => lib.DashboardQuestionFormAdd)
)
const DashboardQuestionFormEdit = dynamic(() =>
  import('@components/ui').then((lib) => lib.DashboardQuestionFormEdit)
)

type Props = {
  quizId: string
  children?: React.ReactNode
}

export const DashboardQuizLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const { data: quiz } = useDocument<QuizModel>(
    props.quizId ? `quiz/${props.quizId}` : null,
    {
      listen: true,
    }
  )
  return (
    <>
      <DashboardLayout
        top={
          <div className="DashboardQuizLayout_header">
            <Link href={`/dashboard/quiz/${props.quizId}`}>
              <a>
                <QuizCard
                  title={quiz?.title}
                  description={quiz?.description}
                  icon={quiz?.icon}
                />
              </a>
            </Link>
          </div>
        }
        side={
          <div className="DashboardQuizLayout_side">
            <ul>
              <li>
                <Link href={`/dashboard/quiz/${props.quizId}`}>
                  <a
                    className={
                      router.pathname == '/dashboard/quiz/[quizId]' &&
                      `DashboardQuizLayout_link-active`
                    }>
                    クイズの編集
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/quiz/${props.quizId}/question`}>
                  <a
                    className={
                      router.pathname == '/dashboard/quiz/[quizId]/question' &&
                      `DashboardQuizLayout_link-active`
                    }>
                    問題をつくる
                  </a>
                </Link>
              </li>
              <li>
                <Link href={`/dashboard/quiz/${props.quizId}/permission`}>
                  <a
                    className={
                      router.pathname ==
                        '/dashboard/quiz/[quizId]/permission' &&
                      `DashboardQuizLayout_link-active`
                    }>
                    権限を設定
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        }>
        <PageModal
          open={dashboardQuizUI.open}
          onClose={() =>
            setDashboardQuizUI({ type: dashboardQuizUI.type, open: false })
          }
          type="big">
          {dashboardQuizUI.type == 'addQuestion' && (
            <DashboardQuestionFormAdd />
          )}
          {dashboardQuizUI.type == 'editQuestion' && (
            <DashboardQuestionFormEdit />
          )}
        </PageModal>

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
                grid-template-rows: 30px;
                gap: 10px;
                list-style-type: none;
                padding: 0;
                li {
                  display: flex;
                  height: 30px;
                  align-items: center;
                  font-size: 1rem;
                  color: rgba(0, 0, 0, 0.5);
                  &:before {
                    content: '●';
                    margin-right: 10px;
                    color: var(--mainAccentColor);
                  }
                }
              }
            }
            &_link-active {
              font-weight: bold;
              color: rgba(0, 0, 0, 0.8);
            }
          }
        `}
      </style>
    </>
  )
}
