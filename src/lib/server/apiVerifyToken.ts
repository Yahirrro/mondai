import admin from 'firebase-admin'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiVerifyToken = async (authorization: string): Promise<any> => {
  try {
    const verifyToken = await admin
      .auth()
      .verifyIdToken(authorization.split('Bearer ')[1])
    return verifyToken
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
