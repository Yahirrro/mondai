import Modal from 'react-modal'

type Props = {
  children?: React.ReactNode
  open: boolean
  onClose: () => void
}

export const PageModal: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Modal
        className="PageModal"
        ariaHideApp={false}
        isOpen={props.open}
        onRequestClose={props.onClose}
        style={{
          overlay: {
            zIndex: '100000',
            backgroundColor: 'rgba(0, 0, 0, 35%)',
            backdropFilter: 'blur(10px)',
          },
        }}>
        <div className="PageModal_body">
          <button className="PageModal_close" onClick={props.onClose}>
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
            @media (max-width: 750px) {
              top: 0;
              left: inherit;
              transform: inherit;
              max-width: inherit;
              height: auto;
              border-radius: 0;
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
