import firebase from 'firebase/app'
import '@lib/firebase'
import { TopicModel } from '@models'

export const getTopic = async (topicId: string): Promise<TopicModel> => {
  try {
    const topicRef = await firebase
      .firestore()
      .collection('topic')
      .doc(topicId)
      .get()
    if (topicRef.exists) {
      const topicData = JSON.parse(JSON.stringify(topicRef.data()))
      if (topicData.isPublished == false) return null
      return { ...topicData, id: topicRef.id, exists: true } as TopicModel
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
