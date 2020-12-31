import { atom, SetterOrUpdater, useRecoilState } from 'recoil'

type Props = {
  type: 'addQuestion' | 'editQuestion' | 'statusQuiz'
  open: boolean
  optional?: {
    quizId?: string
    questionId?: string
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
