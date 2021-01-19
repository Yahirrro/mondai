import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import Link from 'next/link'
import { useUI } from '@components/ui/context'
import { LogoFull } from '@components/ui'

type Props = {
  style?: React.CSSProperties
}

export const PageFooter: React.FunctionComponent<Props> = (props) => {
  const user = useAuthentication()
  const { openModal, setModalView } = useUI()
  return (
    <>
      <footer className="PageFooter" style={props.style}>
        <Link href="/">
          <a aria-label="mondai トップページへ">
            <LogoFull
              style={{ height: 'initial', width: '120px', opacity: 0.5 }}
            />
          </a>
        </Link>
        <ul className="PageFooter_list">
          {user?.userId ? (
            <li>
              <a onClick={() => fuego.auth().signOut()}>ログアウト</a>
            </li>
          ) : (
            <li>
              <a
                onClick={() => {
                  setModalView('LOGIN_VIEW')
                  openModal()
                }}>
                ログイン
              </a>
            </li>
          )}
          <li>
            <Link href="/docs/terms">
              <a>利用規約</a>
            </Link>
          </li>
          <li>
            <Link href="/docs/site">
              <a>このサイトについて</a>
            </Link>
          </li>
          <li>@Yahimotto</li>
        </ul>
        <style jsx>
          {`
            .PageFooter {
              height: 80px;
              display: grid;
              grid-template-columns: 120px 1fr;
              justify-content: space-between;
              padding-left: var(--mainNormalPaddingSize);
              padding-right: var(--mainNormalPaddingSize);
              padding-bottom: var(--mainNormalPaddingSize);
              width: 100%;
              color: #7d7d7d;
              @media (max-width: 600px) {
                height: initial;
                gap: 20px;
                grid-template-columns: 1fr;
                padding-bottom: calc(var(--mainNormalPaddingSize) * 2);
              }
              &_list {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 0;
                margin: 0;
                list-style-type: none;
                @media (max-width: 600px) {
                  justify-content: initial;
                  display: grid;
                  gap: 10px;
                }
                li + li {
                  margin-left: 1rem;
                  @media (max-width: 600px) {
                    margin-left: 0;
                  }
                }
                li {
                  a {
                    cursor: pointer;
                  }
                }
              }
            }
          `}
        </style>
      </footer>
    </>
  )
}
