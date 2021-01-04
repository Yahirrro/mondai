import Modal from 'react-modal'

type Props = {
  children?: React.ReactNode
  open: boolean
  onRequestClose?(event: React.MouseEvent | React.KeyboardEvent): void
  style?: React.CSSProperties
  type?: 'big'
}

export const PageModal: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Modal
        className={`PageModal${props.type ? ` PageModal-${props.type}` : ''}`}
        ariaHideApp={false}
        isOpen={props.open}
        onRequestClose={props.onRequestClose}
        closeTimeoutMS={0}>
        <div className="PageModal_body">
          <button className="PageModal_close" onClick={props.onRequestClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>

          {props.children}
        </div>
      </Modal>

      <style jsx global>
        {`
          .ReactModal__Body--open {
            overflow: hidden;
          }
          .ReactModal__Overlay {
            background-color: rgba(0, 0, 0, 0.35) !important;
            z-index: 1000;
            backdrop-filter: blur(10px);
            opacity: 0;
          }
          .PageModal {
            position: absolute;
            width: 100%;
            max-width: 600px;
            border-radius: 30px;
            background-color: white;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08),
              0 0 1px rgba(1, 0, 0, 0.1);
            outline: none;
            opacity: 0;
            transition: all 0.3s;
            @media (max-width: 750px) {
              top: 0;
              left: inherit;
              transform: inherit;
              max-width: inherit;
              height: auto;
              border-radius: 0;
            }
            &-big {
              max-width: 750px;
            }
            &_body {
              position: relative;
              padding: 40px 30px;
              max-height: 100vh;
              overflow-y: auto;
              @media (max-width: 750px) {
                padding: 40px 20px;
                height: 100vh;
              }
            }
            &_close {
              position: fixed;
              top: 40px;
              right: 30px;
              z-index: 1;
              height: 32px;
              width: 32px;
              border-radius: 50%;
              border: none;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(4px);
              @media (max-width: 750px) {
                top: 20px;
                right: 20px;
              }
              svg {
                fill: white;
                height: 24px;
                min-height: 24px;
                width: 24px;
                min-width: 24px;
              }
            }
          }
          .ReactModal__Content--after-open {
            opacity: 1;
          }
          .ReactModal__Content--before-close {
            opacity: 0;
          }
          .ReactModal__Overlay {
            transition: all 0.3s;
          }
          .ReactModal__Overlay--after-open {
            opacity: 1;
          }
          .ReactModal__Overlay--before-close {
            opacity: 0;
          }
          :global(.PageModal_body > .PageModal_info) {
            margin-bottom: 40px;
          }
          :global(.PageModal_info > .PageModal_title) {
            font-size: 2rem;
            margin: 0;
          }
          :global(.PageModal_info > .PageModal_description) {
            font-size: 1rem;
            margin: 0;
            margin-top: 1rem;
          }
        `}
      </style>
    </>
  )
}
