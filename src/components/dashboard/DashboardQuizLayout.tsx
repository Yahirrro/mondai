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
                  }`}>
                  <button
                    className={`DashboardQuizLayout_list_button`}
                    onClick={() => setPageType('detail')}>
                    <IconPencil />
                    <p>編集</p>
                  </button>
                </li>
                <li
                  className={`DashboardQuizLayout_list ${
                    pageType == 'question' && 'DashboardQuizLayout_link-active'
                  }`}>
                  <button
                    className={`DashboardQuizLayout_list_button`}
                    onClick={() => setPageType('question')}>
                    <IconAdd />
                    <p>問題をつくる</p>
                  </button>
                </li>
                <li
                  className={`DashboardQuizLayout_list ${
                    pageType == 'message' && 'DashboardQuizLayout_link-active'
                  }`}>
                  <button
                    className={`DashboardQuizLayout_list_button`}
                    onClick={() => setPageType('message')}>
                    <IconGift />
                    <p>メッセージ</p>
                  </button>
                </li>
                {quiz?.flow.length !== 0 ? (
                  <li className="DashboardQuizLayout_list DashboardQuizLayout_list-primary DashboardQuizLayout_sideFull">
                    <button
                      className={`DashboardQuizLayout_list_button DashboardQuizLayout_list_button-primary`}
                      onClick={() =>
                        setDashboardQuizUI({ type: 'statusQuiz', open: true })
                      }>
                      <IconEmojiPeople />
                      <p>クイズであそぶ</p>
                    </button>
                  </li>
                ) : (
                  <li className="DashboardQuizLayout_list DashboardQuizLayout_list-primary DashboardQuizLayout_sideFull">
                    <button
                      className={`DashboardQuizLayout_list_button DashboardQuizLayout_list_button-primary`}
                      onClick={() =>
                        setDashboardQuizUI({ type: 'statusQuiz', open: true })
                      }
                      disabled>
                      <IconEmojiPeople />
                      <p>クイズであそぶ</p>
                    </button>
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
                  padding: 10px 0;
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
          .DashboardQuizLayout_list {
            position: relative;
            align-self: center;
            @media (max-width: 900px) {
              gap: 5px;
              &-primary {
                grid-column: initial;
              }
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
              text-align: center;
            }
            &_button {
              cursor: pointer;
              user-select: none;
              text-align: center;
              width: 100%;
              border: none;
              display: grid;
              gap: 10px;
              padding: 0;
              background: none;
              font-family: var(--mainFontFamily);
              @media (max-width: 900px) {
                height: 80px;
                grid-template-rows: 32px 1fr;
              }
              &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
              }

              &-primary {
                position: relative;
                z-index: 1;
                padding: 0 10px;
                border: none;
                :global(svg) {
                  fill: white;
                }
                p {
                  color: white;
                  font-weight: bold;
                }
                @media (min-width: 900px) {
                  background: none;
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
                    z-index: -1;
                    top: 50%;
                    left: 50%;
                    transform: translateY(-50%) translateX(-50%);
                    @media (max-width: 550px) {
                      height: calc(61px + 40px);
                    }
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
