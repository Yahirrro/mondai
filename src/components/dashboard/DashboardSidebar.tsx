import { PageAd } from '@components/ad'
import { IconAdd, IconFace, PageButton, PageCard } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { useDashboardQuizUI } from '@hook/dashboard'
import Link from 'next/link'
import React from 'react'

export const DashboardSidebar: React.FunctionComponent = () => {
  const user = useAuthentication()
  const { setDashboardQuizUI } = useDashboardQuizUI()
  return (
    <>
      <PageCard
        icon={<IconFace />}
        title={user?.userName}
        description="ユーザー"
      />
      <PageButton
        buttontype="big"
        style={{ width: '100%', marginTop: '20px' }}
        icon={<IconAdd />}
        onClick={() =>
          setDashboardQuizUI({
            type: 'createQuiz',
            open: true,
          })
        }>
        クイズをつくる
      </PageButton>

      <ul className="DashboardSidebar_list">
        <li>
          <Link href="/dashboard">
            <a>🎈つくっているクイズ</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/archive">
            <a>💨これまでに作ったクイズ</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/played">
            <a>✔あそんだクイズ</a>
          </Link>
        </li>
      </ul>

      <style jsx>
        {`
          .DashboardSidebar_list {
            list-style-type: none;
            padding-inline-start: 0;
            margin-top: var(--mainNormalPaddingSize);
            display: grid;
            gap: 1rem;
            li {
              color: #7d7d7d;
            }
          }
        `}
      </style>
    </>
  )
}
