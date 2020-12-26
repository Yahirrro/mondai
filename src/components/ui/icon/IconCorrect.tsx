type Props = {
  style?: React.CSSProperties
}

export const IconCorrect: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <svg
        style={props.style}
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M39.5834 13.3542L36.6459 10.4167L25.0001 22.0625L13.3542 10.4167L10.4167 13.3542L22.0626 25L10.4167 36.6458L13.3542 39.5833L25.0001 27.9375L36.6459 39.5833L39.5834 36.6458L27.9376 25L39.5834 13.3542Z"
          fill="#FF0000"
          fillOpacity="0.5"
        />
      </svg>
    </>
  )
}
