import type { NextApiRequest, NextApiResponse } from 'next'
import '@components/lib/firebase-admin'

import admin from 'firebase-admin'
import { QuestionModel, QuizModel } from '@components/models'

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
    response.status(401).json({
      status: 'fail',
      message: 'Unauthorized',
    })
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

    const anserUsers: Array<string> = []

    await Promise.all(
      await quizData.flow.map(async (data) => {
        const questionRef = await admin
          .firestore()
          .doc('quiz/' + request.query.quizId + '/question/' + data)
          .get()
        const question = (await questionRef.data()) as QuestionModel
        anserUsers.push(...question.choice[question.answer].answerUser)
      })
    )
    const allCorrectUsers = Array.from(new Set(anserUsers))

    const userRef = await admin
      .firestore()
      .collection('quiz/' + request.query.quizId + '/user/')
      .get()

    quizRef.update({
      allUser: userRef.size,
      allCorrectUser: allCorrectUsers,
      currentStatus: 'archive',
    })

    response.status(200).json({
      status: 'ok',
      message: 'OK',
    })
    return
  } catch (err) {
    response.status(500).json({
      status: 'fail',
      message: 'Internal Server Error',
      error: err,
    })
    return
  }
}
