import '@lib/firebase-admin'
import admin from 'firebase-admin'

import { QuizModel } from '@models'
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
    return
  }

  if (quizData.flow.length == 0) {
    res.status(422).json({
      status: 'fail',
      message: 'まだ問題が1問もありません',
    })
    return
  }

  const InviteCode = async () => {
    const code = Math.random().toString().slice(2, 7)
    const quizCodeRef = async (): Promise<boolean> => {
      return await admin
        .firestore()
        .collection('quiz')
        .where('currentStatus', '!=', 'answer')
        .where('inviteCode', '==', code)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.size == 0
        })
        .catch((error) => {
          throw new Error(error)
        })
    }

    if ((await quizCodeRef()) == true) {
      return code
    } else {
      return InviteCode()
    }
  }

  await quizRef.update({
    currentStatus: 'waiting',
    currentQuestion: quizData.flow[0],
    inviteCode: await InviteCode(),
  })

  res.status(200).json({
    status: 'ok',
  })
  return
})
