import firebase from 'firebase/app'
import '@lib/firebase'
import { TopicModel } from '@models'

export const getTopics = async (): Promise<Array<TopicModel>> => {
  try {
    const topics = []
    await firebase
      .firestore()
      .collection('topic')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          topics.push({ id: doc.id, ...doc.data() })
        })
      })
    if (topics) {
      return JSON.parse(JSON.stringify(topics)) as Array<TopicModel>
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
