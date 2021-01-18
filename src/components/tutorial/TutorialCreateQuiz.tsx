import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import { IconDone } from '@components/ui'
type Props = {
  show?: boolean
}

const pageProps = [
  {
    imageSrc: '/assets/tutorial/tutorial-create-quiz-1.png',
    title: '問題をつくろう',
    description: 'あなただけの問題をどんどんふやしてみてください!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-create-quiz-2.png',
    title: 'メッセージを添えて',
    description:
      '正解率ごとに好きなメッセージを追加できます! 全く追加しなくてもいいよ!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-create-quiz-3.png',
    title: '｢クイズであそぶ｣をタップ!',
    description: 'クイズ大会を開く準備をはじめます!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-create-quiz-4.png',
    title: 'クイズをあそんでみよう!',
    description: 'ひとりや、みんなで一緒にクイズをといてみよう!',
    className: 'TutorialCreateQuiz_image-top',
  },
] as Array<{
  imageSrc: string
  title: string
  description: string
  className?: string
}>

export const TutorialCreateQuiz: React.FunctionComponent<Props> = (props) => {
  const [hasTutorialDone, setTutorialStatus] = useState<boolean>(false)
  const [pageNum, setPageNum] = useState<number>(0)

  useEffect(() => {
    console.log(window.localStorage['has-got-tutorial-create-quiz'] == 'true')
    if (window.localStorage['has-got-tutorial-create-quiz'] == 'true')
      setTutorialStatus(true)
  }, [])

  const closeTutorial = () => {
    localStorage.setItem('has-got-tutorial-create-quiz', 'true')
    setTutorialStatus(true)
  }

  return (
    <>
      <Modal
        className="TutorialCreateQuiz"
        isOpen={hasTutorialDone == false}
        onRequestClose={closeTutorial}
        ariaHideApp={false}>
        <div className="TutorialCreateQuiz_body">
          <Image
            className={
              pageProps[pageNum]?.className && pageProps[pageNum]?.className
            }
            src={pageProps[pageNum].imageSrc}
            width="600px"
            height="690px"
          />
          <div className="TutorialCreateQuiz_info">
            <div className="TutorialCreateQuiz_content">
              <h2>{pageProps[pageNum].title}</h2>
              <p>{pageProps[pageNum].description}</p>
            </div>
            {pageNum + 1 === pageProps.length ? (
              <button onClick={() => closeTutorial()}>
                <IconDone style={{ fill: 'white' }} />
              </button>
            ) : (
              <button onClick={() => setPageNum(pageNum + 1)}>→</button>
            )}
          </div>
        </div>
      </Modal>
      <style jsx global>
        {`
          .TutorialCreateQuiz {
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
                object-fit: cover;
              }
              :global(.TutorialCreateQuiz_image-top) {
                object-position: top;
              }
            }
            &_content {
              align-self: center;
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
                margin-top: 10px;
                margin-bottom: 0;
                opacity: 0.7;
              }
              button {
                font-family: 'Inter';
                background: #00b2ff;
                height: 60px;
                width: 60px;
                border: none;
                border-radius: 50%;
                align-self: center;
                color: white;
                font-size: 30px;
                @media (max-width: 750px) {
                  height: 50px;
                  width: 50px;
                }
              }
            }
          }
        `}
      </style>
    </>
  )
}
