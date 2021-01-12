import { QuestionModel, QuizModel } from '@models'
import { AllowType } from '@nandorojo/swr-firestore'
import type { FieldValue } from '@firebase/firestore-types'
import { createContext } from 'react'
import { SetterOrUpdater } from 'recoil'

type Context = {
  quiz: QuizModel
  updateQuiz: (data: Partial<AllowType<QuizModel, FieldValue>>) => Promise<void>
  questions: Array<QuestionModel>
  dashboardQuizUI: any
  setDashboardQuizUI: SetterOrUpdater<any>
  pageType: 'detail' | 'question' | 'permission' | 'message'
  setPageType: SetterOrUpdater<'detail' | 'question' | 'permission' | 'message'>
}

export const DashboardQuizContext: React.Context<Context> = createContext<Context>(
  null
)
