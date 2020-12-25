import { useDocument } from '@nandorojo/swr-firestore'
import { useState } from 'react'

import { useAuthentication } from '@hook/auth'
import { UserModel } from '@models'
import { useUI } from '@components/ui/context'
import { PageFormInput, PageButton } from '@components/ui'

export const ModalUserName: React.FunctionComponent = () => {
  const user = useAuthentication()
  const [value, setValue] = useState(user.userName)
  const { update: updateUser } = useDocument<UserModel>(
    user.userId ? `user/${user.userId}` : null,
    {
      listen: false,
    }
  )
  const { closeModal } = useUI()

  const submitUserName = () => {
    if (!value) return
    if (!value.replace(/\s+/g, '')) return
    updateUser({ userName: value.replace(/\s+/g, '') })
    closeModal()
  }

  return (
    <>
      <div className="PageModal_info">
        <h1 className="PageModal_title">表示名を登録しましょう!</h1>
        <p className="PageModal_description">
          表示名を登録することで、クイズ終了時に表示されるようになります!
        </p>
      </div>
      <form
        className="PageFormGroup"
        style={{ display: 'flex' }}
        onSubmit={submitUserName}>
        <PageFormInput
          type="text"
          placeholder="あなたの表示名を入力..."
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value)
          }}
        />
        <PageButton type="submit">決定</PageButton>
      </form>
    </>
  )
}
