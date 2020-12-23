type Props = {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const PageContainer: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="PageContainer" style={props.style}>
        {props.children}
        <style jsx>
          {`
            .PageContainer {
              position: relative;
              max-width: 1400px;
              margin-left: auto;
              margin-right: auto;
              padding-top: var(--mainNormalPaddingSize);
              padding-bottom: calc(var(--mainNormalPaddingSize) * 2);
              padding-left: 20px;
              padding-right: 20px;
            }
          `}
        </style>
      </div>
    </>
  )
}
