import { QuizModel, UserModel } from '@models'

export const isQuizOwner = async (
  quiz: QuizModel,
  user: UserModel
): Promise<boolean> => {
  return quiz?.permission.answer.includes(user?.userId)
}
