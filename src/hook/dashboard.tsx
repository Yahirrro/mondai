import { QuestionModel, QuizModel } from '@models'
import { useDocument } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { atom, SetterOrUpdater, useRecoilState } from 'recoil'

// show Dashboard Modal
type Props = {
  type: 'addQuestion' | 'editQuestion' | 'statusQuiz' | 'createQuiz'
  open: boolean
  optional?: {
    quizId?: string
    questionId?: string
    questionData?: QuestionModel
  }
}
export const dashboardQuizUIState = atom<Props>({
  key: 'dashboardQuizUI',
  default: { type: 'addQuestion', open: false },
})

export function useDashboardQuizUI(): {
  dashboardQuizUI: Props
  setDashboardQuizUI: SetterOrUpdater<Props>
} {
  const [dashboardQuizUI, setDashboardQuizUI] = useRecoilState<Props>(
    dashboardQuizUIState
  )
  return { dashboardQuizUI, setDashboardQuizUI }
}

// fetch Quiz
export const quizState = atom<QuizModel>({
  key: 'quizData',
  default: null,
})

export function useQuizData(): {
  quizData: QuizModel
} {
  const router = useRouter()
  const [quizId, setQuizId] = useState<string>(null)
  const [quizData, setQuizData] = useRecoilState<QuizModel>(quizState)

  useEffect(() => {
    if (quizId !== router.query.quizId) console.log(router.query)
    if (quizId !== router.query.quizId) setQuizId(router.query.quizId as string)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.quizId])

  useEffect(() => {
    console.log('query params updated', router.query.quizId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId])

  const { data: quiz } = useDocument<QuizModel>(
    quizId ? `quiz/${quizId}` : null,
    {
      listen: true,
    }
  )

  useEffect(() => {
    setQuizData(quiz)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz])

  return { quizData }
}
