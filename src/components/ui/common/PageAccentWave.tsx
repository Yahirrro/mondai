export const PageAccentWave: React.FunctionComponent = () => {
  return (
    <>
      <figure className="PageAccentWave">
        <svg
          width="1440"
          height="50"
          viewBox="0 0 1440 50"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50L80 37.4884C160 25.1643 320 -0.139996 480 0.000583377C640 -0.139996 800 25.1643 960 35.0049C1120 44.8454 1280 40.1594 1360 37.4884L1440 35.0049V50H1360C1280 50 1120 50 960 50C800 50 640 50 480 50C320 50 160 50 80 50H0Z" />
        </svg>
        <style jsx>
          {`
            .PageAccentWave {
              display: block;
              position: relative;
              background-color: var(--mainAccentColor);
              background-size: auto auto;
              background-image: var(--mainBackgroundPattern);
              width: 100%;
              height: 70px;
              margin: 0;
              svg {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                fill: var(--mainBackgroundColor);
              }
            }
          `}
        </style>
      </figure>
    </>
  )
}
