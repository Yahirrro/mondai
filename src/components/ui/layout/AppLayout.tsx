import dynamic from 'next/dynamic'
import { PageFooter, PageModal } from '@components/ui/common'
import { useUI } from '@components/ui/common/context'
import type {
  ModalLogin as ModalLoginType,
  ModalUserName as ModalUserNameType,
} from '@components/ui/modal'

const ModalLogin = dynamic(() =>
  import('@components/ui/modal').then((lib) => lib.ModalLogin)
) as typeof ModalLoginType
const ModalUserName = dynamic(() =>
  import('@components/ui/modal').then((lib) => lib.ModalUserName)
) as typeof ModalUserNameType

type Props = {
  children?: React.ReactNode
}

export const AppLayout: React.FunctionComponent<Props> = (props) => {
  const { displayModal, closeModal, modalView } = useUI()
  return (
    <>
      <PageModal open={displayModal} onClose={closeModal}>
        {modalView === 'LOGIN_VIEW' && <ModalLogin />}
        {modalView === 'USERNAME_VIEW' && <ModalUserName />}
      </PageModal>

      {props.children}

      <PageFooter />
    </>
  )
}
