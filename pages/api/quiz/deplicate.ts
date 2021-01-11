import '@lib/firebase-admin'
import admin from 'firebase-admin'

import { apiHandler, apiVerifyToken, generateInviteCode } from '@lib/server'
import { MessageModel, QuestionModel, QuizModel } from '@models'

export default apiHandler.get(async (req, res) => {
  if (req.headers.authorization == undefined) throw new Error('Bad Request')
  const verifyToken = await apiVerifyToken(req.headers.authorization)
  if (req.query.quizId == undefined) throw new Error('Bad Request')

  const quizRef = await admin.firestore().doc('quiz/' + req.query.quizId)
  const quiz = quizRef.get()
  if (!(await quiz).exists) throw new Error('Unauthorized')
  const quizData = {
    ...(await (await quiz).data()),
  } as QuizModel
  const quizDataId = await (await quiz).id

  if (
    quizData.permission.playagain == false ||
    quizData.currentStatus !== 'archive'
  )
    throw new Error('Cant Play Again this quiz')

  const questionRef = await admin
    .firestore()
    .collection(`quiz/${req.query.quizId}/question`)
  const questionData: Array<QuestionModel> = []

  await questionRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      questionData.push({ id: doc.id, ...doc.data() } as QuestionModel)
    })
  })

  const messageRef = await admin
    .firestore()
    .collection(`quiz/${req.query.quizId}/message`)
  const messageData: Array<MessageModel> = []

  await messageRef.get().then((snapshot) => {
    snapshot.forEach((doc) => {
      messageData.push({ id: doc.id, ...doc.data() } as MessageModel)
    })
  })

  await admin
    .firestore()
    .doc(`quiz/${quizDataId}`)
    .update({
      'playagain.useCount': admin.firestore.FieldValue.increment(1),
    })

  const DeplicateQuiz = await admin
    .firestore()
    .collection('quiz')
    .add({
      ...quizData,
      permission: {
        playagain: false,
        owner: [verifyToken.uid],
      },
      currentStatus: 'waiting',
      inviteCode: await generateInviteCode(),
      currentQuestion: quizData.flow[0],
      allCorrectUser: null,
      allUser: null,

      playagain: {
        isPlayagain: true,
        original: quizDataId,
        creator: quizData.permission.owner[0],
      },
    } as QuizModel)

  await Promise.all(
    await quizData.flow.map(async (data) => {
      const question = questionData.find((question) => question.id == data)
      if (!question) return

      const choice: QuestionModel['choice'] = question.choice.map((data) => {
        return { title: data.title }
      })

      await admin
        .firestore()
        .doc(`quiz/${DeplicateQuiz.id}/question/${data}`)
        .set({
          title: question.title,
          commentary: question.commentary,
          answer: question.answer,
          choice: choice as QuestionModel['choice'],
        } as QuestionModel)
    })
  )

  await Promise.all(
    await messageData.map(async (data) => {
      await admin
        .firestore()
        .doc(`quiz/${DeplicateQuiz.id}/message/${data.id}`)
        .set({
          message: data.message,
          percent: data.percent,
        } as MessageModel)
    })
  )

  res.status(200).json({
    status: 'ok',
    quizId: DeplicateQuiz.id,
  })
})
