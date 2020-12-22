import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import { AnswerModel, QuestionModel, QuizModel } from '@components/models'
import {
  QuizButton,
  PageNumber,
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
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
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

  const updateStatus = (status: 'waiting' | 'open' | 'answer' | 'archive') => {
    updateQuiz({
      currentStatus: status,
    })
    setIsAnswered(false)
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
        <title>Create Next App</title>
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
          <QuizCard title={quiz.title} description={quiz.description} />
          <div className="QuizPageHeader_badge">
            <QuizBadge text="開催中"></QuizBadge>
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
            code={11212}
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
                        {isMainAnswer() && (
                          <div
                            style={{
                              textAlign: 'right',
                              marginTop: 'var(--mainNormalPaddingSize)',
                            }}>
                            <QuizButton
                              text="結果を見る"
                              onClick={() => updateStatus('answer')}
                            />
                          </div>
                        )}
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
                        <p>{question.commentary}</p>
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
                          {isMainAnswer() && (
                            <QuizButton
                              text="次の問題へ進む"
                              onClick={() => nextQuestion()}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {isMainAnswer() && (
                            <QuizButton
                              text="全ての結果を見る"
                              onClick={() => updateStatus('archive')}
                            />
                          )}
                        </>
                      )}
                    </div>
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
                <h3>全 {quiz?.flow.length}問</h3>
                <p>回答数：{userAnswer?.length}</p>
                {userAnswer !== undefined &&
                  userAnswer.map((data) => {
                    return <p key={data.questionId}>{data.questionId}</p>
                  })}
              </aside>

              <style jsx>
                {`
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
