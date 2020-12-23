import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'

import { PageNavbar, PageContainer, QuizInviteCodeForm } from '@components/ui'

export default function Home(): ReactElement {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <PageNavbar />

        <header className="IndexPageHeader">
          <PageContainer style={{ height: 'var(--IndexPageHeaderHeight)' }}>
            <div className="IndexPageHeader_info">
              <h1>
                みんなといっしょに
                <br />
                クイズ大会
              </h1>
              <p>リアルタイムクイズアプリ</p>
              <QuizInviteCodeForm />
            </div>
            <div className="IndexPageHeader_image">
              <Image
                className="IndexPageHeader_image"
                src="/assets/headerImage.png"
                height="397px"
                width="640px"
                alt=""
              />
            </div>
          </PageContainer>
          <svg
            className="IndexPageHeader_wave"
            width="1440"
            height="50"
            viewBox="0 0 1440 50"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 50L80 37.4884C160 25.1643 320 -0.139996 480 0.000583377C640 -0.139996 800 25.1643 960 35.0049C1120 44.8454 1280 40.1594 1360 37.4884L1440 35.0049V50H1360C1280 50 1120 50 960 50C800 50 640 50 480 50C320 50 160 50 80 50H0Z"
              fill="#EFEFEF"
            />
          </svg>
        </header>

        <PageContainer>
          <h2>参加しよう</h2>
        </PageContainer>

        <style jsx>
          {`
            .IndexPageHeader {
              position: relative;
              background-color: var(--mainAccentColor);
              --IndexPageHeaderHeight: 600px;
              height: var(--IndexPageHeaderHeight);
              &_info {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: calc(100% - 40px);
                max-width: 800px;
                margin: auto;
                padding-bottom: 25px;
                h1 {
                  font-weight: bold;
                  font-size: 64px;
                  line-height: 87px;
                  margin-top: 0;
                  margin-bottom: 15px;
                  @media (max-width: 520px) {
                    font-size: 3rem;
                    line-height: 1.3;
                  }
                }
                p {
                  margin-top: 0;
                  margin-bottom: 30px;
                }
              }
              &_image {
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                @media (max-width: 1000px) {
                  display: none;
                }
              }
              &_wave {
                height: 50px;
                width: 100%;
                position: absolute;
                bottom: 0;
                fill: var(--mainBackgroundColor);
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
