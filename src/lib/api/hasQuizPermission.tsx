import { QuizModel, UserModel } from '@models'

export const hasQuizPermission = (
  permission: 'owner' | 'answer',
  quiz: QuizModel,
  userId: UserModel['userId']
): boolean => {
  if (quiz?.permission[permission]?.includes(userId) == true) return true
  return false
}
