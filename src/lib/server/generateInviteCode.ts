import admin from 'firebase-admin'

export const generateInviteCode = async (): Promise<string> => {
  const InviteCode = async (): Promise<string> => {
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

  return InviteCode()
}
