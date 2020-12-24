type Props = {
  title: string
}

export const PageTitle: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <header className="PageTitle">
        <h1>{props.title}</h1>
        <style jsx>
          {`
            .PageTitle {
              width: 100%;
              text-align: center;
            }
          `}
        </style>
      </header>
    </>
  )
}
