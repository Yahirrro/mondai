import { QuestionModel, QuizModel } from '@models'
import { createContext } from 'react'
import { SetterOrUpdater } from 'recoil'

type Context = {
  quiz: QuizModel
  questions: Array<QuestionModel>
  dashboardQuizUI: any
  setDashboardQuizUI: SetterOrUpdater<any>
  pageType: 'detail' | 'question' | 'permission' | 'message'
  setPageType: SetterOrUpdater<'detail' | 'question' | 'permission' | 'message'>
}

export const DashboardQuizContext: React.Context<Context> = createContext<Context>(
  null
)
