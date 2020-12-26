type Props = {
  style?: React.CSSProperties
}

export const IconIncorrect: React.FunctionComponent<Props> = (props) => {
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
          d="M25 4.16667C13.4791 4.16667 4.16663 13.4792 4.16663 25C4.16663 36.5208 13.4791 45.8333 25 45.8333C36.5208 45.8333 45.8333 36.5208 45.8333 25C45.8333 13.4792 36.5208 4.16667 25 4.16667ZM25 41.6667C15.8125 41.6667 8.33329 34.1875 8.33329 25C8.33329 15.8125 15.8125 8.33333 25 8.33333C34.1875 8.33333 41.6666 15.8125 41.6666 25C41.6666 34.1875 34.1875 41.6667 25 41.6667Z"
          fill="#FF0000"
          fillOpacity="0.5"
        />
      </svg>
    </>
  )
}
