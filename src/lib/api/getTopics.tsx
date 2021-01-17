import firebase from 'firebase/app'
import '@lib/firebase'
import { TopicModel } from '@models'
import _ from 'lodash'

export const getTopics = async (): Promise<Array<TopicModel>> => {
  const now = new Date()
  try {
    const topics = []
    await firebase
      .firestore()
      .collection('topic')
      .where('isPublished', '==', true)
      .where('endAt', '>', now)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          topics.push({ id: doc.id, ...doc.data() })
        })
      })
      .catch((error) => console.error(error))
    if (topics) {
      console.log(topics)
      const topicsData = topics
        .sort((a, b) => {
          return b.isCampaign - a.isCampaign
        })
        .sort((a, b) => {
          return a.startAt - b.startAt
        })
      return JSON.parse(JSON.stringify(topicsData)) as Array<TopicModel>
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}
