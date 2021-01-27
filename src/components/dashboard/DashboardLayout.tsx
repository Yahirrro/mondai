import React, { useEffect } from 'react'
import { PageContainer, PageModal } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDashboardQuizUI } from '@hook/dashboard'
import dynamic from 'next/dynamic'
import { useUI } from '@components/ui/context'
import { PageAd } from '@components/ad'
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
const DashboardMessageForm = dynamic(() =>
  import('@components/dashboard').then((lib) => lib.DashboardMessageForm)
)

type Props = {
  children?: React.ReactNode
  changeOrder?: boolean
  disableSidebar?: boolean
  side?: React.ReactNode
  top?: React.ReactNode
  disableOverflow?: boolean
}

export const DashboardLayout: React.FunctionComponent<Props> = (props) => {
  const router = useRouter()
  const user = useAuthentication()
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()
  const { openModal, setModalView } = useUI()
  useEffect(() => {
    fuego.auth().onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/')
        setModalView('LOGIN_VIEW')
        openModal()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user])
  return (
    <>
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
          {!props.disableSidebar && (
            <aside
              className={`DashboardLayout_sidebar ${
                props.changeOrder ? 'DashboardLayout_sidebar-index' : ''
              }`}>
              {props.side}
            </aside>
          )}
          <div
            className={`DashboardLayout_content ${
              props.disableSidebar ? 'DashboardLayout_content-full' : ''
            }`}>
            {props.children}
          </div>
        </div>
        {(router.pathname == '/dashboard' ||
          router.pathname == '/dashboard/archive' ||
          router.pathname == '/dashboard/played') && (
          <PageAd type="normal" style={{ marginBottom: 0 }} />
        )}
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
        {dashboardQuizUI.type == 'editMessage' && (
          <DashboardMessageForm style={{ padding: 0, margin: 0 }} />
        )}
      </PageModal>

      <style jsx>
        {`
          .DashboardLayout {
            display: grid;
            gap: 30px 80px;
            grid-template-columns: 280px 1fr;
            @media (max-width: 900px) {
              grid-template-columns: 1fr;
              gap: var(--mainNormalPaddingSize);
            }
            &_header {
              @media (min-width: 900px) {
                grid-column: 1/3;
              }
            }
            &_sidebar,
            &_content {
              ${!props.disableOverflow && 'overflow: hidden;'}
            }
            &_sidebar {
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
              &-full {
                grid-column: 1/3;

                @media (max-width: 900px) {
                  grid-column: initial;
                }
              }
            }
            :global(.DashboardLayout_section + .DashboardLayout_section) {
              margin-top: calc(var(--mainNormalPaddingSize) * 1.5);
              @media (max-width: 750px) {
                margin-top: 50px;
              }
            }

            :global(.DashboardQuizIndex) {
              display: grid;
              grid-template-columns: repeat(
                auto-fit,
                [col-start] minmax(380px, 1fr) [col-end]
              );
              gap: 20px;
              @media (max-width: 750px) {
                grid-template-columns: 1fr;
                gap: 15px;
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
