import '@lib/firebase-admin'
import admin from 'firebase-admin'

import { apiHandler } from '@lib/server'

export default apiHandler.get(async (req, res) => {
  if (req.query.inviteCode == undefined) throw new Error('Bad Request')

  const quizRef = await admin
    .firestore()
    .collection('quiz')
    .where('inviteCode', '==', req.query.inviteCode)
    .where('currentStatus', 'in', ['waiting', 'open', 'answer'])
  const quiz = quizRef.get()

  quiz.catch((error) => {
    console.error(error)
    throw new Error(error)
  })

  if ((await quiz).size == 0) {
    res.status(404).json({
      status: 'Not found',
    })
    return
  }

  await (await quiz).forEach(async (doc) => {
    res.status(200).json({
      status: 'ok',
      data: doc.id,
    })
    return
  })
})
