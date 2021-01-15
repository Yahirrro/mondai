type Props = {
  title: string
  button?: React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
}

export const DashboardCard: React.FunctionComponent<Props> = (props) => {
  return (
    <section className="DashboardCard" style={props.style}>
      <h2 className="DashboardCard_title">{props.title}</h2>
      <div className="DashboardCard_body">{props.children}</div>
      {props.button && (
        <div className="DashboardCard_button">{props.button}</div>
      )}
      <style jsx>
        {`
          .DashboardCard {
            padding: 50px 40px;
            border-radius: 30px;
            background-color: white;
            display: grid;
            gap: 40px;
            max-width: 770px;
            margin: auto;
            @media (max-width: 750px) {
              gap: 20px;
              padding: 30px var(--mainNormalPaddingSize);
            }
            &_title {
              font-size: 32px;
              line-height: 44px;
              margin: 0;
              @media (max-width: 750px) {
                font-size: 1.6rem;
                line-height: 1.4;
              }
            }
            &_body {
              display: grid;
              gap: 30px;
              @media (max-width: 750px) {
                gap: 20px;
              }
            }
            :global(p) {
              margin: 0;
            }
            & + & {
              margin-top: 50px;
              @media (max-width: 750px) {
                margin-top: var(--mainNormalPaddingSize);
              }
            }
          }
          :global(.DashboardInviteQR) {
            height: 120px;
            width: 120px;
            padding: 20px;
            border-radius: 20px;
            background-color: white;
            margin-right: 40px;
            @media (max-width: 750px) {
              margin-right: 0;
            }
          }
          :global(.DashboardInviteCode) {
            height: fit-content;
            :global(h3) {
              font-size: 18px;
              line-height: 22px;
              margin: 0;
            }
            :global(p) {
              font-weight: bold;
              font-size: 64px;
              line-height: 77px;
              letter-spacing: -0.1em;
              margin: 0;
              &:before {
                content: '#';
                opacity: 0.5;
              }
            }
          }
        `}
      </style>
    </section>
  )
}

export const DashboardCardFlow: React.FunctionComponent<{
  children: React.ReactNode
}> = (props) => {
  return (
    <div className="DashboardCardFlow">
      {props.children}
      <style jsx>
        {`
          .DashboardCardFlow {
            position: relative;
            background-color: var(--mainBackgroundColor);
            border-radius: 30px;
            min-height: 100px;
            padding: 30px 30px 30px 100px;
            counter-increment: index;
            @media (max-width: 750px) {
              padding: 120px 15px 30px 15px;
            }
            &:before {
              content: counter(index);
              position: absolute;
              width: 100px;
              height: 100px;
              left: 0;
              top: 0;
              background-color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 64px;
              font-weight: bold;
              line-height: 77px;
              color: rgba(0, 0, 0, 0.34);
              @media (max-width: 750px) {
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                opacity: 0.6;
              }
            }
          }

          :global(.DashboardCardFlow_flex) {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            margin-bottom: 15px;
            @media (max-width: 750px) {
              display: grid;
              gap: 20px;
              place-items: center;
            }
          }
          :global(.DashboardCardFlow_description) {
            font-weight: bold;
            font-size: 20px;
            line-height: 24px;
            text-align: center;
            margin: 0;
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  )
}
