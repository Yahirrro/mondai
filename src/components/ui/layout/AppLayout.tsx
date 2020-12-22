import { useUI } from '@components/ui/common/context'
import React from 'react'
import { PageFooter, PageModal } from '@components/ui/common'
import { ModalLogin, ModalQuizJoin, ModalUserName } from '@components/ui/modal'

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
        {modalView === 'QUIZJOIN_VIEW' && <ModalQuizJoin />}
      </PageModal>

      {props.children}

      <PageFooter />
    </>
  )
}
