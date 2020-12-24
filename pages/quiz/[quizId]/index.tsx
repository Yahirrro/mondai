import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { AnswerModel, QuestionModel, QuizModel } from '@components/models'
import {
  QuizButton,
  PageNumber,
  QuestionAnswerGraph,
  QuestionSelect,
  QuestionSelectCard,
  QuestionTitle,
  QuizBadge,
  QuizCard,
  QuizNote,
  QuizQR,
  ScreenError,
  ScreenLoading,
} from '@components/ui'
import * as firebase from 'firebase/app'
import { useEffect, useState } from 'react'
import { fuego, useCollection, useDocument } from '@nandorojo/swr-firestore'
import { ParsedUrlQuery } from 'querystring'
import { useAuthentication } from '@components/hook/auth'
import { getQuiz } from '@components/lib/api'
import { useUI } from '@components/ui/common/context'

type Props = {
  params: ParsedUrlQuery
  quiz: QuizModel
}

export default function Home(props: Props): React.ReactElement {
  const user = useAuthentication()
  const { openModal, setModalView } = useUI()
  const [value, setValue] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState<{
    correct: number
    incorrect: number
  }>({
    correct: 0,
    incorrect: 0,
  })

  const { data: quiz, update: updateQuiz } = useDocument<QuizModel>(
    props.params.quizId ? `quiz/${props.params.quizId}` : null,
    {
      listen: true,
      revalidateOnMount: true,
      initialData: props.quiz,
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
  const { data: quizJoin, set: setQuizJoin } = useDocument(
    user?.userId ? `quiz/${props.params.quizId}/user/${user?.userId}` : null,
    {
      listen: true,
    }
  )
  const { data: userAnswer, add: addUserAnswer } = useCollection<AnswerModel>(
    user?.userId ? `quiz/${props.params.quizId}/answer/` : null,
    {
      where: ['userId', '==', user?.userId],
      listen: true,
    }
  )
  useEffect(() => {
    console.log(quiz, question, quizJoin, userAnswer)
    if (userAnswer?.find((data) => data.questionId == question?.id)) {
      setIsAnswered(true)
    } else {
      setIsAnswered(false)
    }
  }, [userAnswer, question, quizJoin, quiz])

  useEffect(() => {
    if (!quiz?.exists) return
    if (quiz.currentStatus !== 'open') {
      if (!isAnswered) {
        setCorrectAnswers({
          correct: getCorrectAnswerAmount(),
          incorrect: getIncorrectAnswerAmount(),
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer, quiz, setCorrectAnswers])

  if (!quiz?.exists) return <ScreenError code={404} />

  const submitAnswer = (event) => {
    event.preventDefault()

    if (user == null) {
      setModalView('LOGIN_VIEW')
      openModal()
      return
    }
    if (value == null) return
    if (userAnswer?.find((data) => data.questionId == question?.id)) return

    if (quizJoin.exists == false) {
      setQuizJoin({
        userId: user.userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    addUserAnswer({
      userId: user?.userId,
      answer: value,
      isCorrectAnswer: value == question.answer,
      questionId: question.id,
    })
    setIsAnswered(true)
  }

  const checkAnswer = () => {
    if (
      userAnswer == [] ||
      userAnswer == undefined ||
      userAnswer.find((data) => data.questionId == question.id) == undefined
    )
      return false
    if (
      question.choice.indexOf(question.choice[question.answer]) ==
      userAnswer.find((data) => data.questionId == question.id).answer
    )
      return true
    else return false
  }

  const isRemainingQuizExists = () => {
    if (quiz.flow[quiz.flow.indexOf(quiz.currentQuestion) + 1] == undefined)
      return false
    else return true
  }

  const isMainAnswer = () => {
    if (quiz.permission?.answer?.find((data) => data == user?.userId))
      return true
    else return false
  }

  const getRemainingQuestionCount = () => {
    return quiz.flow.length - (quiz.flow.indexOf(quiz.currentQuestion) + 1)
  }

  const getCorrectAnswerAmount = () => {
    if (!userAnswer || userAnswer == []) return 0
    return userAnswer?.filter((data) => data.isCorrectAnswer == true)?.length
  }

  const getIncorrectAnswerAmount = () => {
    if (!userAnswer || userAnswer == []) return 0
    return userAnswer?.filter((data) => data.isCorrectAnswer == false)?.length
  }

  const updateStatus = (status: QuizModel['currentStatus']) => {
    updateQuiz({
      currentStatus: status,
    })
    setIsAnswered(false)
  }

  const goStatusAnswer = async () => {
    setIsApiLoading(true)
    fuego
      .auth()
      .currentUser.getIdToken(true)
      .then(async (idToken) => {
        await fetch(`/api/quiz/countAnswers?quizId=` + quiz.id, {
          headers: { authorization: 'Bearer ' + idToken },
        })
          .then((data) => {
            console.log(data)
            setIsApiLoading(false)
          })
          .catch((error) => {
            console.error(error)
          })
      })
  }

  const nextQuestion = () => {
    if (!isRemainingQuizExists()) return
    updateQuiz({
      currentStatus: 'open',
      currentQuestion: quiz.flow[quiz.flow.indexOf(quiz.currentQuestion) + 1],
    })
    setIsAnswered(false)
  }

  return (
    <>
      <Head>
        <title>{props.quiz?.title} | QuizApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          background: 'var(--mainBackgroundColor)',
          position: 'relative',
          minHeight: 'calc(100vh - 80px)',
        }}>
        {/* ヘッダー */}
        <header className="QuizPageHeader">
          <QuizCard
            title={quiz.title}
            description={quiz.description}
            icon={quiz.icon}
          />
          <div className="QuizPageHeader_badge">
            <QuizBadge text={quiz.currentStatus}></QuizBadge>
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
                  flex-flow: wrap;
                  height: 30px;
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
                  background-size: auto auto;
                  background-image: var(--mainBackgroundPattern);
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
          <QuizQR
            url={`https://realtimequiz.yahiro.vercel.app/quiz/${props.params.quizId}`}
            code={quiz.inviteCode}
          />
          <style jsx>
            {`
              .QuizPageInvite {
                position: absolute;
                z-index: 1;
                top: var(--mainNormalPaddingSize);
                right: var(--mainNormalPaddingSize);
                @media (max-width: 750px) {
                  display: none;
                }
              }
            `}
          </style>
        </aside>

        {!question?.exists ? (
          <ScreenLoading />
        ) : (
          <>
            <main className="QuizPageContent">
              <div>
                {quiz.currentStatus == 'waiting' && (
                  <div>
                    <h2>開始を待っています</h2>
                  </div>
                )}
                {quiz.currentStatus == 'open' && (
                  <>
                    <QuestionTitle title={question?.title}></QuestionTitle>
                    {!isAnswered ? (
                      //回答前
                      <form onSubmit={submitAnswer}>
                        <div className="QuestionSelect">
                          {question.choice.map((data, index) => {
                            return (
                              <QuestionSelect
                                key={data.title}
                                title={data.title}
                                index={(index + 1).toString()}>
                                <input
                                  type="radio"
                                  id={data.title}
                                  name={question.title}
                                  value={data.title}
                                  onChange={() => {
                                    setValue(question.choice.indexOf(data))
                                  }}></input>
                              </QuestionSelect>
                            )
                          })}
                        </div>
                        <div
                          style={{
                            textAlign: 'right',
                          }}>
                          <QuizButton
                            text="解答する"
                            type="submit"
                            disabled={value == null}
                          />
                        </div>
                      </form>
                    ) : (
                      // 回答済み
                      <>
                        <QuizNote
                          title={'🤔結果はどうだ'}
                          style={{ marginTop: '50px' }}>
                          <p>
                            あなたはメイン回答者です。「結果を見るボタン」をクリックすると、集計が開始され、すべての参加者の答えを確認できます。
                          </p>
                        </QuizNote>
                        <div
                          style={{
                            textAlign: 'right',
                            marginTop: 'var(--mainNormalPaddingSize)',
                          }}>
                          {isMainAnswer() ? (
                            <>
                              <QuizButton
                                text="結果を見る"
                                isLoading={isApiLoading}
                                onClick={() => goStatusAnswer()}
                              />
                            </>
                          ) : (
                            <QuizButton text="結果を見る" disabled />
                          )}
                        </div>
                      </>
                    )}
                  </>
                )}

                {quiz.currentStatus == 'answer' && (
                  <div>
                    <QuestionTitle title={question?.title}></QuestionTitle>

                    <div className="QuestionSelect">
                      <QuestionSelectCard
                        title={question?.choice[question.answer].title}
                        index={'A'}
                        type="selected"
                        style={{ cursor: 'default' }}
                      />
                      <QuizNote
                        title={checkAnswer() ? '😚正解！' : '😥不正解...'}>
                        <p>
                          正解は「
                          <strong>
                            {`${question.answer}. ${
                              question?.choice[question.answer].title
                            }`}
                          </strong>
                          」
                        </p>
                        {question?.commentary && <p>{question.commentary}</p>}
                      </QuizNote>
                    </div>

                    <div
                      style={{
                        textAlign: 'right',
                        marginTop: 'var(--mainNormalPaddingSize)',
                      }}>
                      <p>のこり{getRemainingQuestionCount()}問です！</p>

                      {isRemainingQuizExists() ? (
                        <>
                          <QuizButton
                            text="次の問題へ進む"
                            onClick={() => isMainAnswer() && nextQuestion()}
                            disabled={!isMainAnswer()}
                          />
                        </>
                      ) : (
                        <>
                          <QuizButton
                            text="全ての結果を見る"
                            onClick={() =>
                              isMainAnswer() && updateStatus('archive')
                            }
                            disabled={!isMainAnswer()}
                          />
                        </>
                      )}
                    </div>

                    <QuestionAnswerGraph
                      data={question.choice}
                      correctAnswer={question.answer}
                    />
                  </div>
                )}

                {quiz.currentStatus == 'archive' && (
                  <div>
                    <h2>全ての問題が終了しました！</h2>

                    <div className="QuestionSelect">
                      <div>
                        <h3>すべての参加者数🎉</h3>
                        <PageNumber number={12121} unit="人" />
                      </div>
                      <div>
                        <h3>ぜんぶ正解した人🎉</h3>
                        <PageNumber number={5} unit="人" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <aside>
                <div className="QuizCard">
                  <h3 className="QuizCard_title">正解状況</h3>
                  <div className="QuizCard_content">
                    <div className="QuizCard_number">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M25 4.16667C13.4791 4.16667 4.16663 13.4792 4.16663 25C4.16663 36.5208 13.4791 45.8333 25 45.8333C36.5208 45.8333 45.8333 36.5208 45.8333 25C45.8333 13.4792 36.5208 4.16667 25 4.16667ZM25 41.6667C15.8125 41.6667 8.33329 34.1875 8.33329 25C8.33329 15.8125 15.8125 8.33333 25 8.33333C34.1875 8.33333 41.6666 15.8125 41.6666 25C41.6666 34.1875 34.1875 41.6667 25 41.6667Z"
                          fill="#FF0000"
                          fillOpacity="0.5"
                        />
                      </svg>
                      <p>{correctAnswers.correct}</p>
                    </div>
                    <div className="QuizCard_number">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M39.5834 13.3542L36.6459 10.4167L25.0001 22.0625L13.3542 10.4167L10.4167 13.3542L22.0626 25L10.4167 36.6458L13.3542 39.5833L25.0001 27.9375L36.6459 39.5833L39.5834 36.6458L27.9376 25L39.5834 13.3542Z"
                          fill="#FF0000"
                          fillOpacity="0.5"
                        />
                      </svg>
                      <p>{correctAnswers.incorrect}</p>
                    </div>
                  </div>
                  <p className="QuizCard_description">
                    全{quiz?.flow.length}問
                  </p>
                </div>
              </aside>

              <style jsx>
                {`
                  .QuizCard {
                    padding: 30px 20px;
                    background: #ffffff;
                    border-radius: 20px;
                    &_title {
                      text-align: center;
                      margin-top: 0;
                      margin-bottom: 10px;
                      font-size: 24px;
                      line-height: 33px;
                    }
                    &_description {
                      font-weight: bold;
                      font-size: 18px;
                      line-height: 22px;
                      text-align: center;
                      color: rgba(0, 0, 0, 0.34);
                      margin-top: 10px;
                      margin-bottom: 0;
                    }
                    &_content {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      gap: 10px;
                    }
                    &_number {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      p {
                        font-weight: bold;
                        font-size: 72px;
                        line-height: 87px;
                        margin: 0;
                      }
                    }
                  }
                  .QuizPageContent {
                    display: grid;
                    grid-template-columns: 1fr 300px;
                    gap: calc(var(--mainNormalPaddingSize) * 2);
                    padding: var(--mainNormalPaddingSize);
                    @media (max-width: 1050px) {
                      grid-template-columns: 1fr;
                      padding: calc(var(--mainNormalPaddingSize) * 1.5)
                        var(--mainNormalPaddingSize);
                    }
                  }
                  .QuestionSelect {
                    display: grid;
                    gap: var(--mainNormalPaddingSize);
                    margin-top: calc(var(--mainNormalPaddingSize) * 1.5);
                    margin-bottom: var(--mainNormalPaddingSize);
                    grid-template-columns: repeat(
                      auto-fit,
                      [col-start] minmax(340px, 1fr) [col-end]
                    );
                    @media (max-width: 750px) {
                      grid-template-columns: 1fr;
                      margin-top: calc(var(--mainNormalPaddingSize) * 2);
                    }
                    &_input {
                      cursor: pointer;
                      width: 100%;
                      height: 60px;
                      padding: 1rem 1rem;
                      border: 1px solid whitesmoke;
                    }
                  }
                  .QuizButtonContainer {
                    display: flex;
                    align-items: center;
                    margin-top: var(--mainNormalPaddingSize);
                  }
                `}
              </style>
            </main>
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
      quiz: await getQuiz(params.quizId as string),
    },
    revalidate: 60,
  }
}
