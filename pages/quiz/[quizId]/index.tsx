import firebase from 'firebase/app'
import { NextSeo } from 'next-seo'
import { GetStaticPaths, GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ParsedUrlQuery } from 'querystring'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'

import { AnswerModel, QuestionModel, QuizModel } from '@models'
import {
  QuizCorrectCard,
  QuizContext,
  QuizPageHeader,
  QuizPageInvite,
  ScreenError,
  ScreenLoading,
} from '@components/ui'

const QuizScreenWaiting = dynamic(() =>
  import('@components/ui/quiz/screen').then((lib) => lib.QuizScreenWaiting)
)
const QuizScreenOpen = dynamic(() =>
  import('@components/ui/quiz/screen').then((lib) => lib.QuizScreenOpen)
)
const QuizScreenAnswer = dynamic(() =>
  import('@components/ui/quiz/screen').then((lib) => lib.QuizScreenAnswer)
)
const QuizScreenArchive = dynamic(() =>
  import('@components/ui/quiz/screen').then((lib) => lib.QuizScreenArchive)
)

import { useAuthentication } from '@hook/auth'
import { getQuiz } from '@lib/api'
import { useUI } from '@components/ui/context'
import { getIdToken } from '@lib/api'

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
  const { data: allQuestion } = useCollection<QuestionModel>(
    quiz?.currentStatus == 'archive'
      ? `quiz/${props.params.quizId}/question`
      : null
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
    if (quiz?.exists == false) return
    if (quiz?.currentStatus !== 'open') {
      setCorrectAnswers({
        correct: userAnswer && getCorrectAnswerAmount(),
        incorrect: userAnswer && getIncorrectAnswerAmount(),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz?.currentStatus])

  if (!quiz?.exists) return <ScreenError code={404} />
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
      setQuizJoin({
        userId: user.userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
    addUserAnswer({
      userId: user?.userId,
      answer: answerValue,
      isCorrectAnswer: answerValue == question.answer,
      questionId: question.id,
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

  const isMainAnswer = () => {
    return quiz.permission?.some(
      (data) => data.userId == user.userId && data.permission == 'answer'
    )
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
        console.log(data)
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
        console.log(data)
        setIsApiLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <NextSeo title={quiz.title} description={quiz.description} />

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
          <QuizPageInvite />

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
                  <QuizCorrectCard />
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
