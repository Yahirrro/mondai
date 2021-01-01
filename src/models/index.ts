export interface QuizModel {
  id: string
  exists: boolean
  title: string
  description: string
  icon: string
  inviteCode: null | number
  permission: Array<{
    userId: string
    permission: 'owner' | 'moderator' | 'answer'
  }>
  allCorrectUser: null | Array<string>
  allUser: null | number
  flow: Array<string>
  currentStatus: 'creating' | 'waiting' | 'open' | 'answer' | 'archive'
  currentQuestion: string | null
}

export interface QuestionModel {
  id: string
  title: string
  answer: number
  choice: Array<{
    title: string
    answerAmount?: null | number
    answerUser?: null | Array<string>
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
