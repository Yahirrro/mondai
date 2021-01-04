import firebase from 'firebase/app'
import '@lib/firebase'
import { QuizModel } from '@models'

export const getQuiz = async (quizId: string): Promise<QuizModel | null> => {
  try {
    const quizRef = await firebase
      .firestore()
      .collection('quiz')
      .doc(quizId)
      .get()
    if (quizRef.exists) {
      const quizData = JSON.parse(JSON.stringify(quizRef.data()))
      return { ...quizData, exists: true } as QuizModel | null
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
