type Props = {
  style?: React.CSSProperties
}

export const LogoIcon: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <svg
        style={props.style}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="black"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M14.9801 30C12.3701 30 9.78008 29.3 7.50008 27.99C0.370082 23.87 -2.11992 14.71 1.97008 7.56L6.07008 0.47C6.23008 0.18 6.54008 0 6.87008 0H29.0601C29.5801 0 30.0001 0.42 30.0001 0.94V14.9C30.0001 17.6 29.2901 20.26 27.9401 22.6C25.2801 27.15 20.3001 30 14.9801 30Z" />
      </svg>
    </>
  )
}
