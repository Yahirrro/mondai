import { useDocument } from '@nandorojo/swr-firestore'
import { useEffect, useState } from 'react'

import { useAuthentication } from '@hook/auth'
import { UserModel } from '@models'
import { useUI } from '@components/ui/context'
import { PageFormInput, PageButton } from '@components/ui'
import { useRouter } from 'next/router'

export const ModalUserName: React.FunctionComponent = () => {
  const user = useAuthentication()
  const router = useRouter()
  const [value, setValue] = useState(user.userName)
  const { update: updateUser } = useDocument<UserModel>(
    user.userId ? `user/${user.userId}` : null
  )
  const { closeModal } = useUI()

  const submitUserName = () => {
    if (!value) return
    if (!value.replace(/\s+/g, '')) return
    updateUser({ userName: value.replace(/\s+/g, '') })
    if (router.pathname == '/') {
      router.push('/dashboard').then(() => closeModal())
    }
    closeModal()
    return
  }

  return (
    <>
      <div className="PageModal_info">
        <h1 className="PageModal_title">😗ユーザー名を決めよう!</h1>
        <p className="PageModal_description">
          ここで入力した名前がmondaiのクイズ大会などでつかわれるようになります!
        </p>
      </div>
      <form
        className="PageFormGroup"
        style={{ display: 'flex' }}
        onSubmit={submitUserName}>
        <PageFormInput
          type="text"
          placeholder="あなたの表示名を入力..."
          maxLength={20}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
          }}
          required
        />
        <PageButton type="submit">決定</PageButton>
      </form>
    </>
  )
}
