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

        const answerUser = []
        await Promise.all(
          await answerRef.docs.map((doc) => {
            answerUser.push(doc.data().userId)
          })
        )

        choice[index] = {
          ...data,
          answerAmount: answerRef.size,
          answerUser: answerUser,
        }
      })
    )

    console.log(choice)
    questionRef.update({ choice: choice })
    quizRef.update({ currentStatus: 'answer' })

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
