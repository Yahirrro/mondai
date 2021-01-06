import { MessageModel, QuestionModel, QuizModel } from '@models'
import { atom, SetterOrUpdater, useRecoilState } from 'recoil'

// show Dashboard Modal
type Props = {
  type:
    | 'addQuestion'
    | 'editQuestion'
    | 'statusQuiz'
    | 'createQuiz'
    | 'editMessage'
  open: boolean
  optional?: {
    quizId?: QuizModel['id']
    questionId?: QuestionModel['id']
    questionData?: QuestionModel
    messagePercent?: MessageModel['percent']
    messageData?: MessageModel
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
