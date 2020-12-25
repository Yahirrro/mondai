import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import _ from 'lodash'

import '@lib/firebase-admin'

import { QuestionModel, QuizModel } from '@models'

type Data = {
  status: string
  message: string
  error?: string
}

export default async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
): Promise<Data> => {
  let verifyToken
  try {
    const token = request.headers.authorization.split('Bearer ')[1]
    verifyToken = await admin.auth().verifyIdToken(token)
  } catch {
    response.statusCode = 401
    response.setHeader('Content-Type', 'application/json')
    response.end(
      JSON.stringify({
        status: 'fail',
        message: 'Unauthorized',
      })
    )
    return
  }

  if (request.query.quizId == undefined) throw new Error('Bad Request')

  try {
    const quizRef = await admin.firestore().doc('quiz/' + request.query.quizId)
    const quiz = quizRef.get()

    if (!(await quiz).exists) throw new Error('Unauthorized')
    const quizData = (await (await quiz).data()) as QuizModel

    if (quizData.permission.answer?.includes(verifyToken.uid) == false)
      throw new Error('Quiz not found')

    const anserUsers: Array<Array<string>> = []

    await Promise.all(
      await quizData.flow.map(async (data) => {
        const questionRef = await admin
          .firestore()
          .doc('quiz/' + request.query.quizId + '/question/' + data)
          .get()
        const question = (await questionRef.data()) as QuestionModel
        anserUsers.push(question.choice[question.answer].answerUser)
      })
    )
    _.intersection(...anserUsers)

    console.log(_.intersection(...anserUsers))

    const userRef = await admin
      .firestore()
      .collection('quiz/' + request.query.quizId + '/user/')
      .get()

    quizRef.update({
      allUser: userRef.size,
      allCorrectUser: _.intersection(...anserUsers),
      currentStatus: 'archive',
    })

    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json')
    response.end(
      JSON.stringify({
        status: 'ok',
        message: 'OK',
      })
    )
    return
  } catch (err) {
    response.statusCode = 500
    response.setHeader('Content-Type', 'application/json')
    response.end(
      JSON.stringify({
        status: 'fail',
        message: 'Internal Server Error',
        error: err,
      })
    )
    return
  }
}
