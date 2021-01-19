import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil'
import { UserModel } from '@models'

import { fuego } from '@nandorojo/swr-firestore'
import { useUI } from '@components/ui/context'
import { sendLogEvent } from '@lib/api'

export const userState = atom<UserModel>({
  key: 'user',
  default: null,
})

export function useAuthentication(): UserModel {
  const { openModal, setModalView, modalView, displayModal } = useUI()
  const [user, setUser] = useRecoilState<UserModel | null>(userState)
  const [isLogEvent, setIsLogEvent] = useState(true)
  useEffect(() => {
    if (user !== null) {
      return
    }
    fuego.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const loginUser = await getUserData(firebaseUser.uid)
        setUser(loginUser)
        if (loginUser.userName === null) {
          if (isLogEvent) {
            sendLogEvent('sign_up', {
              method: firebaseUser.providerData[0].providerId,
            })
            setIsLogEvent(false)
          }
          setModalView('USERNAME_VIEW')
          openModal()
        } else {
          if (isLogEvent) {
            sendLogEvent('login', {
              method: firebaseUser.providerData[0].providerId,
            })
            setIsLogEvent(false)
          }
        }
      } else {
        setUser(null)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    const f = async () => {
      const loginUser = await getUserData(user?.userId)
      setUser(loginUser)
    }
    if (displayModal == false && modalView == 'USERNAME_VIEW') f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayModal])

  return user
}

async function getUserData(uid: string): Promise<UserModel> {
  const userRef = fuego.db.collection('user').doc(uid)
  const doc = await userRef.get()

  // これまでログインしたことがある場合
  if (doc.exists) {
    const userData: UserModel = {
      userId: uid,
      userName: doc.data().userName ? doc.data().userName : null,
    }
    return userData
  }

  // 新規登録の場合
  else {
    await userRef.set({
      userId: uid,
    })
    const userData: UserModel = {
      userId: uid,
      userName: null,
    }
    return userData
  }
}
