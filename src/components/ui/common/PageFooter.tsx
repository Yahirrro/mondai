import Link from 'next/link'

type Props = {
  style?: React.CSSProperties
}

export const PageFooter: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <footer className="PageFooter" style={props.style}>
        <div>
          <ul className="PageFooter_list">
            <li>
              <Link href="/">
                <a>トップ</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="PageFooter_list">
            <li>
              <Link href="/">
                <a>利用規約</a>
              </Link>
            </li>
            <li>@Yahimotto</li>
          </ul>
        </div>
        <style jsx>
          {`
            .PageFooter {
              height: 80px;
              display: flex;
              justify-content: space-between;
              padding-left: var(--mainNormalPaddingSize);
              padding-right: var(--mainNormalPaddingSize);
              padding-bottom: var(--mainNormalPaddingSize);
              width: 100%;
              color: #9d9d9d;
              &_list {
                display: flex;
                align-items: center;
                padding: 0;
                margin: 0;
                list-style-type: none;
                li + li {
                  margin-left: 1rem;
                }
              }
            }
          `}
        </style>
      </footer>
    </>
  )
}
