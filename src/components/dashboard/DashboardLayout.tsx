import React, { useEffect } from 'react'
import { PageContainer, PageModal } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { DefaultSeo } from 'next-seo'
import { useDashboardQuizUI } from '@hook/dashboard'
import dynamic from 'next/dynamic'

const DashboardQuestionFormAdd = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuestionFormAdd)
)
const DashboardQuestionFormEdit = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuestionFormEdit)
)
const DashboardQuizFormStatus = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizFormStatus)
)
const DashboardQuizFormCreate = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardQuizFormCreate)
)

type Props = {
  children?: React.ReactNode
  side?: React.ReactNode
  top?: React.ReactNode
}

export const DashboardLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const user = useAuthentication()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  useEffect(() => {
    fuego.auth().onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/')
      }
    })
  }, [router, user])
  return (
    <>
      <DefaultSeo title="ダッシュボード" />

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
          <aside
            className={`DashboardLayout_sidebar ${
              router.pathname == '/dashboard' && 'DashboardLayout_sidebar-index'
            }`}>
            {props.side}
          </aside>
          <div className="DashboardLayout_content">{props.children}</div>
        </div>
      </PageContainer>

      <PageModal
        open={dashboardQuizUI.open}
        onRequestClose={() =>
          setDashboardQuizUI({
            type: dashboardQuizUI.type,
            open: false,
          })
        }
        type="big">
        {dashboardQuizUI.type == 'addQuestion' && <DashboardQuestionFormAdd />}
        {dashboardQuizUI.type == 'editQuestion' && (
          <DashboardQuestionFormEdit />
        )}
        {dashboardQuizUI.type == 'statusQuiz' && <DashboardQuizFormStatus />}
        {dashboardQuizUI.type == 'createQuiz' && <DashboardQuizFormCreate />}
      </PageModal>

      <style jsx>
        {`
          .DashboardLayout {
            display: grid;
            gap: 30px 80px;
            grid-template-columns: 280px 1fr;
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
            &_sidebar-index {
              @media (max-width: 900px) {
                margin-top: 50px;
                order: 1;
              }
            }
            &_content {
              :global(.DashboardLayout_title) {
                margin-top: 0;
                margin-bottom: 20px;
                font-size: 1.5em;
              }
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
