import { QuizModel } from '@models'
import { fuego } from '@nandorojo/swr-firestore'

export const getIdToken = async (): Promise<QuizModel | null> => {
  return await fuego.auth().currentUser.getIdToken(true)
}
