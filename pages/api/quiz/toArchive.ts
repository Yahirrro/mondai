import '@lib/firebase-admin'
import admin from 'firebase-admin'

import _ from 'lodash'

import { QuestionModel, QuizModel } from '@models'
import { apiHandler, apiVerifyToken } from '@lib/server'
import { hasQuizPermission } from '@lib/api'

export default apiHandler.get(async (req, res) => {
  const verifyToken = await apiVerifyToken(req.headers.authorization)

  if (req.query.quizId == undefined) throw new Error('Bad Request')

  const quizRef = await admin.firestore().doc('quiz/' + req.query.quizId)
  const quiz = quizRef.get()

  if (!(await quiz).exists) throw new Error('Unauthorized')
  const quizData = (await (await quiz).data()) as QuizModel

  if (
    (hasQuizPermission('owner', quizData, verifyToken.uid) ||
      hasQuizPermission('answer', quizData, verifyToken.uid)) == false
  ) {
    res.status(401).json({
      status: 'fail',
      message: '権限がありません',
    })
  }

  const anserUsers: Array<Array<string>> = []

  await Promise.all(
    await quizData.flow.map(async (data) => {
      const questionRef = await admin
        .firestore()
        .doc('quiz/' + req.query.quizId + '/question/' + data)
        .get()
      const question = (await questionRef.data()) as QuestionModel
      anserUsers.push(question.choice[question.answer].answerUser)
    })
  )

  const userRef = await admin
    .firestore()
    .collection('quiz/' + req.query.quizId + '/user/')
    .get()

  quizRef.update({
    allUser: userRef.size,
    allCorrectUser: _.intersection(...anserUsers),
    currentStatus: 'archive',
  })

  res.status(200).json({
    status: 'ok',
  })
})
