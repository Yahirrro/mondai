import { QuestionModel } from '@models'
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
