export interface QuizModel {
  id: string
  title: string
  description: string
  permission: {
    owner: Array<string> | null
    moderator: Array<string> | null
    anser: Array<string> | null
  }
  currentStatus: 'waiting' | 'open' | 'answer' | 'archive'
  currentQuestion: number | null
}

export interface QuestionModel {
  id: string
  title: string
  answer: number
  choice: Array<{
    title: string
    description: string
    answerUsers: null | number
  }>
  afterAnswer: null | {
    collectRate: string
    joinUsers: number
  }
}

export interface AnswerModel {
  id: string
  answerId: string
  questionId: string
  userId: string
}
