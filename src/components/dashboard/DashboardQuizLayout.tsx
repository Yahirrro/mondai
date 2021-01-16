import {
  IconAdd,
  IconEmojiPeople,
  IconGift,
  IconPencil,
  PageButton,
} from '@components/ui'
import { DashboardLayout, DashboardQuizContext } from '@components/dashboard'
import { QuizBadge, QuizCard, QuizQR } from '@components/quiz'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDashboardQuizUI } from '@hook/dashboard'
import { DefaultSeo } from 'next-seo'
import React, { useContext } from 'react'
import { getDomain } from '@lib/api'

type Props = {
  disableSidebar?: boolean
  children?: React.ReactNode
}

export const DashboardQuizLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const { setDashboardQuizUI } = useDashboardQuizUI()

  const { quiz, pageType, setPageType } = useContext(DashboardQuizContext)

  return (
    <>
      <DashboardLayout
        disableSidebar={props.disableSidebar}
        top={
          <div className="DashboardQuizLayout_header">
            <Link href={`/dashboard/quiz/${router.query.quizId}`}>
              <a>
                <QuizCard
                  title={quiz?.title}
                  description={quiz?.description}
                  emoji={quiz?.emoji}
                  long={true}
                />
              </a>
            </Link>
          </div>
        }
        side={
          <div className="DashboardQuizLayout_side">
            {quiz?.currentStatus == 'creating' && (
              <ul>
                <li
                  className={`DashboardQuizLayout_list ${
                    pageType == 'detail' && 'DashboardQuizLayout_link-active'
                  }`}
                  onClick={() => setPageType('detail')}>
                  <IconPencil />
                  <p>編集</p>
                </li>
                <li
                  className={`DashboardQuizLayout_list ${
                    pageType == 'question' && 'DashboardQuizLayout_link-active'
                  }`}
                  onClick={() => setPageType('question')}>
                  <IconAdd />
                  <p>問題をつくる</p>
                </li>
                <li
                  className={`DashboardQuizLayout_list ${
                    pageType == 'message' && 'DashboardQuizLayout_link-active'
                  }`}
                  onClick={() => setPageType('message')}>
                  <IconGift />
                  <p>メッセージ</p>
                </li>
                {quiz?.flow.length !== 0 && (
                  <li
                    className={`DashboardQuizLayout_list DashboardQuizLayout_list-primary DashboardQuizLayout_sideFull`}
                    onClick={() =>
                      setDashboardQuizUI({ type: 'statusQuiz', open: true })
                    }>
                    <IconEmojiPeople />
                    <p>クイズであそぶ</p>
                  </li>
                )}
              </ul>
            )}
            {(quiz?.currentStatus == 'waiting' ||
              quiz?.currentStatus == 'open' ||
              quiz?.currentStatus == 'answer') && (
              <ul>
                <li className="DashboardQuizLayout_sideFull">
                  <Link href={`/quiz/${router.query.quizId}`}>
                    <a>
                      <PageButton
                        style={{
                          width: '100%',
                        }}>
                        クイズ大会ページ
                      </PageButton>
                    </a>
                  </Link>
                </li>
                <li className="DashboardQuizLayout_sideFull">
                  <QuizQR
                    url={`${getDomain()}/quiz/${router.query.quizId}`}
                    code={quiz?.inviteCode}
                  />
                </li>
              </ul>
            )}
            {quiz?.currentStatus == 'archive' && (
              <div style={{ display: 'grid', gap: '10px', width: '100%' }}>
                <QuizBadge text={`${quiz.allUser}人参加`} />
                <QuizBadge text={`${quiz.allCorrectUser.length}人全問正解`} />
                <QuizBadge text={`${quiz.playagain.useCount}回使用`} />
              </div>
            )}
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
                margin: 0;
                @media (max-width: 900px) {
                  grid-template-columns: 1fr 1fr 1fr 1fr;
                  gap: 5px;
                  padding: 23px 0;
                }
                .DashboardQuizLayout_list {
                  user-select: none;
                  cursor: pointer;
                  text-align: -webkit-center;
                  position: relative;
                  width: 100%;
                  display: grid;
                  gap: 10px;
                  @media (max-width: 900px) {
                    gap: 5px;
                  }
                  :global(svg) {
                    z-index: 1;
                    width: 100%;
                    height: 32px;
                  }
                  p {
                    z-index: 1;
                    margin: 0;
                    font-size: 0.8rem;
                    color: rgba(0, 0, 0, 0.5);
                    align-self: center;
                  }
                  &-primary {
                    padding: 0 10px;
                    :global(svg) {
                      fill: white;
                    }
                    p {
                      color: white;
                      font-weight: bold;
                    }
                    @media (min-width: 900px) {
                      padding: 10px !important;
                      background-color: var(--mainPrimaryColor);
                      background-size: auto auto;
                      background-image: var(--mainBackgroundPattern);
                      border-radius: 15px;
                    }
                    @media (max-width: 900px) {
                      &:before {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: calc(61px + 20px);
                        background-color: var(--mainPrimaryColor);
                        background-size: auto auto;
                        background-image: var(--mainBackgroundPattern);
                        border-radius: 15px;
                        z-index: 0;
                        top: 50%;
                        left: 50%;
                        transform: translateY(-50%) translateX(-50%);
                        @media (max-width: 550px) {
                          height: calc(61px + 40px);
                        }
                      }
                    }
                    @media (max-width: 900px) {
                      grid-column: initial;
                    }
                  }
                }
              }
            }
            &_sideFull {
              grid-column: 1/4;
              @media (max-width: 900px) {
                grid-column: 1/5;
              }
            }
            &_link-active {
              p {
                font-weight: bold;
                color: rgba(0, 0, 0, 0.9);
              }
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
