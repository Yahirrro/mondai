import Link from 'next/link'
import { PageContainer, LogoFull, IconFace } from '@components/ui'
import { useAuthentication } from '@hook/auth'
import { useUI } from '@components/ui/context'
type Props = {
  style?: React.CSSProperties
}

export const PageNavbar: React.FunctionComponent<Props> = (props) => {
  const user = useAuthentication()
  const { openModal, setModalView } = useUI()

  const openLoginModal = () => {
    setModalView('LOGIN_VIEW')
    openModal()
  }
  return (
    <>
      <nav className="PageNavbar" style={props.style}>
        <PageContainer
          style={{ paddingTop: 0, paddingBottom: 0, maxWidth: '1600px' }}>
          <div className="PageNavbar_flex">
            <Link href="/">
              <a aria-label="mondai トップページへ">
                <LogoFull style={{ height: '26px', width: 'initial' }} />
              </a>
            </Link>
            <ul className="PageNavbar_list">
              {!user?.userId && (
                <>
                  <li>
                    <a onClick={openLoginModal}>ログイン</a>
                  </li>
                  <li onClick={openLoginModal}>
                    <a onClick={openLoginModal}>登録</a>
                  </li>
                </>
              )}
              {user?.userId && (
                <>
                  <li>
                    <Link href="/dashboard/">
                      <a>ダッシュボード</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/">
                      <a>
                        <IconFace />
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </PageContainer>
        <style jsx>
          {`
            .PageNavbar {
              height: 70px;
              position: absolute;
              top: 30px;
              z-index: 1;
              width: 100%;
              @media (max-width: 750px) {
                top: 10px;
              }
              &_flex {
                height: 70px;
                display: flex;
                justify-content: space-between;
                a {
                  align-self: center;
                }
              }
              &_list {
                display: flex;
                align-items: center;
                padding: 0;
                margin: 0;
                list-style-type: none;
                li {
                  font-weight: bold;
                  a {
                    cursor: pointer;
                  }
                  :global(svg) {
                    vertical-align: middle;
                  }
                }
                li + li {
                  margin-left: 30px;
                }
              }
            }
          `}
        </style>
      </nav>
    </>
  )
}
