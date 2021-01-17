import firebase from 'firebase/app'
import '@lib/firebase'
import { QuizModel } from '@models'

export const getQuizByTopic = async (
  topicId: string
): Promise<Array<QuizModel>> => {
  try {
    console.log(topicId)
    const quizzez = []
    await firebase
      .firestore()
      .collection('quiz')
      .where('topicId', '==', topicId)
      .where('currentStatus', '==', 'archive')
      .where('permission.playagain', '==', true)
      .orderBy('playagain.useCount', 'desc')
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          quizzez.push({ id: doc.id, ...doc.data() })
        })
      })
      .catch((error) => {
        console.error(error)
      })
    if (quizzez) {
      return JSON.parse(JSON.stringify(quizzez)) as Array<QuizModel>
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
