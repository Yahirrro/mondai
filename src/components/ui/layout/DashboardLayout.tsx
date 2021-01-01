import React, { useEffect } from 'react'
import { PageContainer } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

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
      <NextSeo title="ダッシュボード" />

      <PageContainer style={{ marginTop: '10px' }}>
        <div className="DashboardLayout">
          <div className="DashboardLayout_header DashboardBreadcrumb">
            <Link href="/dashboard">
              <a>ダッシュボード</a>
            </Link>
            {router.pathname.includes('/dashboard/quiz/[quizId]') && (
              <Link href={`/dashboard/quiz/${router.query.quizId}`}>
                <a>クイズ編集画面</a>
              </Link>
            )}
          </div>
          {props.top && (
            <div className="DashboardLayout_header">{props.top}</div>
          )}
          <aside className="DashboardLayout_sidebar">{props.side}</aside>
          <div className="DashboardLayout_content">{props.children}</div>
        </div>
      </PageContainer>

      <style jsx>
        {`
          .DashboardLayout {
            display: grid;
            gap: 30px 100px;
            grid-template-columns: 200px 1fr;
            @media (max-width: 900px) {
              grid-template-columns: 1fr;
              gap: calc(var(--mainNormalPaddingSize) / 2);
            }
            &_header {
              @media (min-width: 900px) {
                grid-column: 1/3;
              }
            }
            &_sidebar,
            &_content {
              overflow: hidden;
            }
          }
          .DashboardBreadcrumb {
            font-weight: bold;
            font-size: 0.9rem;
            display: flex;
            opacity: 0.5;
            @media (max-width: 900px) {
              margin-bottom: 10px;
            }
            a {
              margin-right: 1rem;
            }
            a + a:before {
              content: '>';
              margin-right: 1rem;
            }
          }
        `}
      </style>
    </>
  )
}
