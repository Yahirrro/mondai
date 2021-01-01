import {
  DashboardLayout,
  IconAdd,
  IconFace,
  IconPencil,
  PageButton,
  QuizCard,
  QuizQR,
} from '@components/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDashboardQuizUI, useQuizData } from '@hook/dashboard'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'

type Props = {
  quizId: string
  children?: React.ReactNode
}

export const DashboardQuizLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const { setDashboardQuizUI } = useDashboardQuizUI()
  const { quizData: quiz } = useQuizData()

  useEffect(() => {
    if (
      (router.pathname == '/dashboard/quiz/[quizId]/permission' ||
        router.pathname == '/dashboard/quiz/[quizId]/question') &&
      quiz?.currentStatus !== 'creating'
    ) {
      router.push(`/dashboard/quiz/${props.quizId}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

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
              {quiz?.currentStatus == 'creating' ? (
                <>
                  <li>
                    <Link href={`/dashboard/quiz/${props.quizId}`}>
                      <a
                        className={
                          router.pathname == '/dashboard/quiz/[quizId]' &&
                          `DashboardQuizLayout_link-active`
                        }>
                        <IconPencil />
                        編集
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={`/dashboard/quiz/${props.quizId}/question`}>
                      <a
                        className={
                          router.pathname ==
                            '/dashboard/quiz/[quizId]/question' &&
                          `DashboardQuizLayout_link-active`
                        }>
                        <IconAdd />
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
                        <IconFace />
                        権限を設定
                      </a>
                    </Link>
                  </li>
                  <li className="DashboardQuizLayout_sideFull">
                    <PageButton
                      style={{
                        width: '100%',
                      }}
                      onClick={() =>
                        setDashboardQuizUI({ type: 'statusQuiz', open: true })
                      }>
                      あそぶ
                    </PageButton>
                  </li>
                </>
              ) : (
                <>
                  <li className="DashboardQuizLayout_sideFull">
                    <QuizQR
                      url={`https://dev.mondai.page/quiz/${props.quizId}`}
                      code={quiz?.inviteCode}
                    />
                  </li>
                  <li className="DashboardQuizLayout_sideFull">
                    <Link href={`/quiz/${props.quizId}`}>
                      <a>
                        <PageButton
                          style={{
                            width: '100%',
                          }}>
                          クイズページへ
                        </PageButton>
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        }>
        {quiz?.title && <DefaultSeo title={`${quiz?.title}の編集`} />}

        {props.children}
      </DashboardLayout>

      <style jsx>
        {`
          .DashboardQuizLayout {
            &_header {
            }
            &_side {
              ul {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                gap: 30px 10px;
                list-style-type: none;
                padding: 0;
                li {
                  font-size: 0.8rem;
                  color: rgba(0, 0, 0, 0.5);
                  :global(svg) {
                    z-index: 1;
                    width: 100%;
                    height: 32px;
                  }
                  a {
                    text-align: -webkit-center;
                    position: relative;
                    width: 100%;
                    display: grid;
                    grid-template-rows: 32px 1fr;
                    gap: 10px;
                  }
                }
              }
            }
            &_sideFull {
              grid-column: 1/4;
            }
            &_link-active {
              font-weight: bold;
              color: rgba(0, 0, 0, 0.8);
              &:before {
                position: absolute;
                z-index: 0;
                content: '';
                height: 32px;
                width: 32px;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--mainAccentColor);
                border-radius: 50%;
              }
            }
          }
        `}
      </style>
    </>
  )
}
