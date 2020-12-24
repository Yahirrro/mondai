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
    console.log(verifyToken)
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
    if (quizData.currentStatus !== 'open' || !quizData.currentQuestion)
      throw new Error('Quiz not found')

    const questionRef = await admin
      .firestore()
      .doc(
        'quiz/' + request.query.quizId + '/question/' + quizData.currentQuestion
      )
    const question = questionRef.get()
    const questionData = {
      ...(await question).data(),
      id: questionRef.id,
    } as QuestionModel

    const choice = []

    await Promise.all(
      await questionData.choice.map(async (data, index) => {
        const answerRef = await admin
          .firestore()
          .collection('quiz/' + request.query.quizId + '/answer')
          .where('questionId', '==', quizData.currentQuestion)
          .where('answer', '==', index)
          .get()

        await choice.push({
          ...data,
          answerAmount: answerRef.size,
        })
      })
    )
    questionRef.update({ choice: choice })
    quizRef.update({ currentStatus: 'answer' })

    response.status(200).send({
      status: 'ok',
      message: 'OK',
    })
  } catch (err) {
    response.status(500).send({
      status: 'fail',
      message: 'Internal Server Error',
      error: err,
    })
  }
}
