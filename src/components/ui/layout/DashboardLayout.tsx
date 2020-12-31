import React, { useEffect } from 'react'
import { PageContainer } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'

type Props = {
  children?: React.ReactNode
  side?: React.ReactNode
  top?: React.ReactNode
}

export const DashboardLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const user = useAuthentication()
  useEffect(() => {
    fuego.auth().onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/')
      }
    })
  }, [router, user])
  return (
    <>
      <PageContainer>
        {props.top}
        <div className="DashboardLayout">
          <aside className="DashboardLayout_sidebar">{props.side}</aside>
          <div className="DashboardLayout_content">{props.children}</div>
        </div>
      </PageContainer>

      <style jsx>
        {`
          .DashboardLayout {
            display: grid;
            gap: 100px;
            grid-template-columns: 200px 1fr;
            @media (max-width: 900px) {
              grid-template-columns: 1fr;
              gap: calc(var(--mainNormalPaddingSize) * 2);
            }
            &_sidebar,
            &_content {
              overflow: hidden;
            }
          }
        `}
      </style>
    </>
  )
}
