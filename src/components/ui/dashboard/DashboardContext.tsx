import { QuizModel } from '@models'
import { createContext } from 'react'

type Context = {
  quiz: QuizModel
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeModal: () => void
  modalView: 'ADD_CHOICE'
  setModalView: React.Dispatch<React.SetStateAction<string>>

  currentQuestionId: string
  setCurrentQuestionId: React.Dispatch<React.SetStateAction<string>>
}

export const DashboardContext: React.Context<Context> = createContext<Context>(
  null
)
