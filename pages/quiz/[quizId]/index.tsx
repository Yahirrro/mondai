import firebase from 'firebase/app'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'

import { AnswerModel, QuestionModel, QuizModel } from '@models'
import {
  QuizCorrectCard,
  QuizContext,
  QuizPageHeader,
  QuizPageInvite,
  QuizNote,
} from '@components/quiz'
import { ScreenError, ScreenLoading } from '@components/screen'

const QuizScreenWaiting = dynamic(() =>
  import('@components/quiz').then((lib) => lib.QuizScreenWaiting)
)
const QuizScreenOpen = dynamic(() =>
  import('@components/quiz').then((lib) => lib.QuizScreenOpen)
)
const QuizScreenAnswer = dynamic(() =>
  import('@components/quiz').then((lib) => lib.QuizScreenAnswer)
)
const QuizScreenArchive = dynamic(() =>
  import('@components/quiz').then((lib) => lib.QuizScreenArchive)
)

import { useAuthentication } from '@hook/auth'
import { getQuiz, hasQuizPermission, sendLogEvent } from '@lib/api'
import { useUI } from '@components/ui/context'
import { getIdToken } from '@lib/api'
import Link from 'next/link'
import { IconAdd, PageButton, PageCard } from '@components/ui'

type Props = {
  params: ParsedUrlQuery
  quiz: QuizModel
}

export default function Home(props: Props): React.ReactElement {
  const user = useAuthentication()
  const { openModal, setModalView } = useUI()

  const [answerValue, setAnswerValue] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState<{
    correct: number
    incorrect: number
  }>({
    correct: 0,
    incorrect: 0,
  })

  const {
    data: quiz,
    update: updateQuiz,
    error: errorQuiz,
  } = useDocument<QuizModel>(
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
  const { data: allQuestion } = useCollection<QuestionModel>(
    quiz?.currentStatus == 'archive'
      ? `quiz/${props.params.quizId}/question`
      : null
  )
  const { data: quizJoin, set: setQuizJoin } = useDocument(
    user?.userId
      ? `quiz/${props.params.quizId}/participant/${user?.userId}`
      : null
  )
  const { data: userAnswer, add: addUserAnswer } = useCollection<AnswerModel>(
    user?.userId ? `quiz/${props.params.quizId}/answer/` : null,
    {
      where: ['userId', '==', user?.userId],
      listen: true,
    }
  )

  useEffect(() => {
    if (userAnswer?.find((data) => data.questionId == question?.id)) {
      setIsAnswered(true)
    } else {
      setIsAnswered(false)
    }
  }, [userAnswer, question, quizJoin, quiz])

  useEffect(() => {
    if (quiz?.exists == false) return
    if (quiz?.currentStatus !== 'open') {
      setCorrectAnswers({
        correct: userAnswer ? getCorrectAnswerAmount() : 0,
        incorrect: userAnswer ? getIncorrectAnswerAmount() : 0,
      })
    }
    setAnswerValue(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz?.currentStatus])

  useEffect(() => {
    sendLogEvent('view_item', {
      items: [
        {
          id: quiz.id,
          title: quiz.title,
          description: quiz.description,
          emoji: quiz.emoji,
          owner: quiz.permission.owner[0],
          isPlayagain: quiz.playagain.isPlayagain,
        },
      ],
    })
  }, [])

  if (!quiz?.exists || errorQuiz) return <ScreenError code={404} />
  if (quiz?.currentStatus == 'creating') return <ScreenError code={404} />

  const submitAnswer = (event) => {
    event.preventDefault()

    if (user == null) {
      setModalView('LOGIN_VIEW')
      openModal()
      return
    }
    if (answerValue == null) return
    if (userAnswer?.find((data) => data.questionId == question?.id)) return

    if (quizJoin.exists == false) {
      sendLogEvent('quiz_participate', {
        items: [
          {
            id: quiz.id,
            title: quiz.title,
            description: quiz.description,
            emoji: quiz.emoji,
            owner: quiz.permission.owner[0],
            isPlayagain: quiz.playagain.isPlayagain,
          },
        ],
      })
      setQuizJoin({
        userId: user.userId,
        quizId: quiz?.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    addUserAnswer({
      userId: user?.userId,
      answer: answerValue,
      isCorrectAnswer: answerValue == question.answer,
      questionId: question.id,
    })
    sendLogEvent('quiz_answer', {
      items: [
        {
          id: quiz.id,
          questionId: question.id,
          questionTitle: question.title,
          answerValue: answerValue,
          questionSelectTitle: question.choice.find(
            (data, index) => index == answerValue
          )?.title,
        },
      ],
    })
    setIsAnswered(true)
  }

  const isCorrectAnswer = () => {
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

  const isMainAnswer = (): boolean => {
    if (
      hasQuizPermission('owner', quiz, user?.userId) ||
      hasQuizPermission('answer', quiz, user?.userId)
    ) {
      return true
    }
    return false
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

  const getCorrectRate = () => {
    if (!userAnswer || userAnswer == [] || getCorrectAnswerAmount() == 0)
      return 0
    const correctRate = getCorrectAnswerAmount() / quiz?.flow.length
    return correctRate
  }

  const goNextQuestion = () => {
    if (!isRemainingQuizExists()) return
    updateQuiz({
      currentStatus: 'open',
      currentQuestion: quiz.flow[quiz.flow.indexOf(quiz.currentQuestion) + 1],
    })
    setIsAnswered(false)
  }

  const goStatusOpenScreen = async () => {
    updateQuiz({
      currentStatus: 'open',
    })
  }

  const goStatusAnswerScreen = async () => {
    setIsApiLoading(true)
    await fetch(`/api/quiz/toAnswer?quizId=` + quiz.id, {
      headers: { authorization: 'Bearer ' + (await getIdToken()) },
    })
      .then((data) => {
        setIsApiLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const goStatusArchiveScreen = async () => {
    if (isRemainingQuizExists()) return
    setIsApiLoading(true)

    await fetch(`/api/quiz/toArchive?quizId=` + quiz.id, {
      headers: { authorization: 'Bearer ' + (await getIdToken()) },
    })
      .then((data) => {
        setIsApiLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <NextSeo
        title={quiz.title}
        description={quiz.description}
        noindex={true}
        openGraph={{
          images: [
            {
              url: `https://mondai.page/api/quiz/ogp?title=${quiz.title}&description=${quiz.description}`,
              width: 1200,
              height: 630,
              alt: quiz.title,
            },
          ],
        }}
      />

      <QuizContext.Provider
        value={{
          quiz,
          question,
          allQuestion,
          userAnswer,
          user,
          submitAnswer,
          isCorrectAnswer,
          isRemainingQuizExists,
          isMainAnswer,
          getRemainingQuestionCount,
          getCorrectAnswerAmount,
          getIncorrectAnswerAmount,
          getCorrectRate,
          goNextQuestion,
          goStatusOpenScreen,
          goStatusAnswerScreen,
          goStatusArchiveScreen,

          answerValue,
          setAnswerValue,
          isAnswered,
          setIsAnswered,
          isApiLoading,
          setIsApiLoading,
          correctAnswers,
          setCorrectAnswers,
        }}>
        <div className="QuizPage">
          <QuizPageHeader />
          {quiz.currentStatus !== 'archive' && <QuizPageInvite />}

          <main className="QuizPageContent">
            {!question?.exists ? (
              <ScreenLoading />
            ) : (
              <>
                <div>
                  {quiz.currentStatus == 'waiting' && <QuizScreenWaiting />}
                  {quiz.currentStatus == 'open' && <QuizScreenOpen />}
                  {quiz.currentStatus == 'answer' && <QuizScreenAnswer />}
                  {quiz.currentStatus == 'archive' && <QuizScreenArchive />}
                </div>
                <aside>
                  {userAnswer && <QuizCorrectCard />}

                  {quiz?.playagain?.isPlayagain && (
                    <PageCard
                      style={{ marginTop: 'var(--mainNormalPaddingSize)' }}
                      title="もう一度プレイ中"
                      description={`公開されているクイズをあそんでいます`}></PageCard>
                  )}

                  {quiz.currentStatus == 'archive' && (
                    <QuizNote
                      title="😍おつかれさまでした!"
                      style={{ marginTop: 'var(--mainNormalPaddingSize)' }}>
                      <p>クイズ大会おつかれさまでした👺</p>
                      <p>mondaiをつかったクイズ大会はいかがでしたか？</p>
                      <p>
                        たのしんでもらえたなら、またmondaiをつかってクイズ大会をひらいてみてください😘
                      </p>
                      <Link href="/dashboard">
                        <a style={{ marginTop: '20px', width: '100%' }}>
                          <PageButton
                            buttontype="big"
                            icon={<IconAdd />}
                            style={{ width: '100%' }}>
                            クイズをつくる
                          </PageButton>
                        </a>
                      </Link>
                    </QuizNote>
                  )}
                </aside>
              </>
            )}
          </main>

          <style jsx>
            {`
              .QuizPage {
                position: relative;
                min-height: calc(100vh - 80px);
              }
              .QuizPageContent {
                display: grid;
                grid-template-columns: 1fr 300px;
                gap: calc(var(--mainNormalPaddingSize) * 2);
                padding: var(--mainNormalPaddingSize);
                @media (min-width: 1500px) {
                  grid-template-columns: 1fr 350px;
                }
                @media (max-width: 1050px) {
                  grid-template-columns: 1fr;
                  padding: calc(var(--mainNormalPaddingSize) * 1.5)
                    var(--mainNormalPaddingSize);
                }
              }
            `}
          </style>
        </div>
      </QuizContext.Provider>
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
