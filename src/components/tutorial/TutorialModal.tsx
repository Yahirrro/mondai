import Modal from 'react-modal'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { IconArrowForward, IconDone } from '@components/ui'

type Props = {
  pageProps: Array<{
    imageSrc: string
    title: string
    description: string
    className?: string
  }>

  localStorageKey: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const TutorialModal: React.FunctionComponent<Props> = (props) => {
  const [hasTutorialDone, setTutorialStatus] = useState<boolean>(false)

  useEffect(() => {
    console.log(window.localStorage[props.localStorageKey] == 'true')
    if (window.localStorage[props.localStorageKey] == 'true')
      setTutorialStatus(true)
  }, [])

  const closeTutorial = () => {
    localStorage.setItem(props.localStorageKey, 'true')
    setTutorialStatus(true)
  }
  const [pageNum, setPageNum] = useState<number>(0)
  return (
    <>
      <Modal
        className="TutorialModal"
        isOpen={hasTutorialDone == false}
        onRequestClose={closeTutorial}
        ariaHideApp={false}>
        <div className="TutorialModal_body">
          <Image
            className={
              props.pageProps[pageNum]?.className &&
              props.pageProps[pageNum]?.className
            }
            src={props.pageProps[pageNum].imageSrc}
            width="600px"
            height="690px"
          />
          <div className="TutorialModal_info">
            <div className="TutorialModal_content">
              <h2>{props.pageProps[pageNum].title}</h2>
              <p>{props.pageProps[pageNum].description}</p>
            </div>
            {pageNum + 1 === props.pageProps.length ? (
              <button
                className="TutorialModal_button"
                onClick={() => closeTutorial()}>
                <IconDone style={{ fill: 'white' }} />
              </button>
            ) : (
              <button
                className="TutorialModal_button"
                onClick={() => setPageNum(pageNum + 1)}>
                <IconArrowForward style={{ fill: 'white' }} />
              </button>
            )}
          </div>
        </div>
      </Modal>
      <style jsx global>
        {`
          .TutorialModal {
            position: absolute;
            width: 100%;
            max-width: 500px;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);
            outline: none;

            &_body {
              height: 600px;
              position: relative;
              overflow-y: auto;
              background-color: white;
              border-radius: 30px;

              display: grid;
              grid-template-rows: 1fr 110px;
              gap: 20px;

              @media (max-width: 750px) {
                height: 500px;
                width: calc(100% - 40px);
                margin: auto;
                grid-template-rows: 1fr 120px;
              }

              :global(img) {
                background-color: rgba(0, 0, 0, 0.02);
                object-fit: cover;
              }
              :global(.TutorialModal_image-top) {
                object-position: top;
              }
            }
            &_content {
              display: grid;
              gap: 5px;
            }
            &_info {
              padding: 0 30px 30px 30px;
              display: grid;
              grid-template-columns: 1fr 60px;
              gap: 10px;
              @media (max-width: 750px) {
                padding: 0 20px 20px 20px;
                grid-template-columns: 1fr 50px;
              }
              h2 {
                font-size: 24px;
                line-height: 33px;
                display: flex;
                align-items: center;
                margin: 0;
                color: var(--mainPrimaryColor);
                @media (max-width: 750px) {
                  font-size: 1.3rem;
                  line-height: 1.4;
                }
              }
              p {
                font-size: 0.9rem;
                margin-top: 0;
                margin-bottom: 0;
                opacity: 0.7;
              }
            }
            &_button {
              font-family: 'Inter';
              background-color: var(--mainPrimaryColor);
              height: 60px;
              width: 60px;
              max-height: 60px;
              max-width: 60px;
              padding: 0;
              border: none;
              border-radius: 50%;
              display: flex;
              align-items: center;
              align-self: center;
              justify-content: center;
              color: white;
              font-size: 30px;
              cursor: pointer;
              @media (max-width: 750px) {
                height: 50px;
                width: 50px;
              }
              :global(svg) {
                width: 32px;
                height: 32px;
              }
            }
          }
        `}
      </style>
    </>
  )
}
