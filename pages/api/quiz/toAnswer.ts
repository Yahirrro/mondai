import '@lib/firebase-admin'
import admin from 'firebase-admin'

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
    (await hasQuizPermission('owner', quizData, verifyToken.uid)) == false ||
    (await hasQuizPermission('answer', quizData, verifyToken.uid)) == false
  )
    throw new Error('Quiz not found')

  if (quizData.currentStatus !== 'open' || !quizData.currentQuestion)
    throw new Error('Quiz not found')

  const questionRef = await admin
    .firestore()
    .doc('quiz/' + req.query.quizId + '/question/' + quizData.currentQuestion)
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
        .collection('quiz/' + req.query.quizId + '/answer')
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

  questionRef.update({ choice: choice })
  quizRef.update({ currentStatus: 'answer' })

  res.status(200).json({
    status: 'ok',
  })
})
