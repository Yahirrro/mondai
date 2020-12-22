export interface QuizModel {
  id: string
  exists: boolean
  title: string
  description: string
  permission: {
    owner: Array<string> | null
    moderator: Array<string> | null
    answer: Array<string> | null
  }
  flow: Array<string>
  currentStatus: 'waiting' | 'open' | 'answer' | 'archive'
  currentQuestion: string | null
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
  commentary: null | string
  afterAnswer: null | {
    collectRate: string
    joinUsers: number
  }
}

export interface AnswerModel {
  id?: string
  answer: number
  isCorrectAnswer: null | boolean
  questionId: string
  userId: string
}

export interface UserModel {
  userId: string
  userName: string
}

export interface quizJoinModel {
  userId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createdAt: any
}
