import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import { UserModel } from '@components/models'

import { fuego } from '@nandorojo/swr-firestore'
import { useUI } from '@components/ui/common/context'

export const userState = atom<UserModel>({
  key: 'user',
  default: null,
})

export function useAuthentication(): UserModel {
  const { openModal, setModalView } = useUI()
  const [user, setUser] = useRecoilState<UserModel | null>(userState)
  useEffect(() => {
    if (user !== null) {
      return
    }

    fuego.auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const loginUser = await getUserData(firebaseUser.uid)
        setUser(loginUser)
        if (loginUser.userName === null) {
          setModalView('USERNAME_VIEW')
          openModal()
        }
      } else {
        setUser(null)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser, user])

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
