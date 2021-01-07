import { QuizModel, UserModel } from '@models'

export const hasQuizPermission = async (
  permission: 'owner' | 'answer',
  quiz: QuizModel,
  userId: UserModel['userId']
): Promise<boolean> => {
  try {
    const boolean = quiz?.permission[permission]?.includes(userId)
    return boolean
  } catch (error) {
    return false
  }
}
