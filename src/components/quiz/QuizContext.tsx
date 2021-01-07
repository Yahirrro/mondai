import { AnswerModel, QuestionModel, QuizModel, UserModel } from '@models'
import { createContext } from 'react'

type Context = {
  quiz: QuizModel
  question: QuestionModel
  allQuestion: Array<QuestionModel>
  userAnswer: Array<AnswerModel>
  user: UserModel

  submitAnswer: (event) => void
  isCorrectAnswer: () => boolean
  isRemainingQuizExists: () => boolean
  isMainAnswer: () => Promise<boolean>
  getRemainingQuestionCount: () => number
  getCorrectAnswerAmount: () => number
  getIncorrectAnswerAmount: () => number
  getCorrectRate: () => number
  goNextQuestion: () => void
  goStatusOpenScreen: () => void
  goStatusAnswerScreen: () => void
  goStatusArchiveScreen: () => void

  answerValue: number
  setAnswerValue: React.Dispatch<React.SetStateAction<number>>
  isAnswered: boolean
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>
  isApiLoading: boolean
  setIsApiLoading: React.Dispatch<React.SetStateAction<boolean>>
  correctAnswers: {
    correct: number
    incorrect: number
  }
  setCorrectAnswers: React.Dispatch<
    React.SetStateAction<{
      correct: number
      incorrect: number
    }>
  >
}

export const QuizContext: React.Context<Context> = createContext<Context>(null)
