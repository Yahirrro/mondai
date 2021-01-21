export interface QuizModel {
  id: string
  exists: boolean

  title: string
  description: string
  emoji: string
  permission: {
    playagain: boolean
    owner: Array<UserModel['userId']>
    answer: Array<UserModel['userId']>
  }
  flow: Array<string>

  playagain: {
    isPlayagain: boolean
    useCount: number
    original: QuizModel['id']
    creator: UserModel['userId']
  }

  currentStatus: 'creating' | 'waiting' | 'open' | 'answer' | 'archive'

  currentQuestion: null | string
  inviteCode: null | string
  allCorrectUser: null | Array<string>
  allUser: null | number

  topicId: TopicModel['id']

  createdAt: any
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

export interface MessageModel {
  id: string
  percent: number
  message: string
}

export interface TopicModel {
  id: string
  title: string
  color: string
  description: string
  content: string

  isCampaign: boolean
  priority: number

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  startAt: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endAt: any
}
