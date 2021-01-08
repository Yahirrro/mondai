import { NextSeo } from 'next-seo'
import Image from 'next/image'
import React, { ReactElement } from 'react'

import { PageAccentWave, PageContainer } from '@components/ui'
import { QuizInviteCodeForm } from '@components/quiz'

export default function Home(): ReactElement {
  return (
    <>
      <NextSeo
        title={'mondai | みんなでリアルタイムクイズ大会!'}
        description={
          'mondaiはみんなでクイズをリアルタイムにワイワイ解けるアプリです。mondaiをつかえば、友達同士やイベントでリアルタイムにクイズを出題することが出来ます。'
        }
      />

      <div>
        <header className="IndexPageHeader">
          <PageContainer style={{ height: 'var(--IndexPageHeaderHeight)' }}>
            <div className="IndexPageHeader_info">
              <h1>
                🙋‍♀️🙋‍♂️
                <br />
                みんなと
                <br className="IndexPageHeader_infoBreakpoint" />
                いっしょに
                <br />
                クイズ大会
              </h1>
              <p>リアルタイムクイズアプリ mondai</p>
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
          <PageAccentWave />
        </header>

        <PageContainer>
          <h2 className="IndexPage_title">
            クイズをつくって、
            <br />
            みんなといっしょにあそぼう!
          </h2>
          <div className="IndexPage_cards">
            <IndexPageCard
              title="つくる"
              message="あなただけのクイズをつくってみましょう！"
              image={<img src="assets/index/create.svg" />}
            />
            <IndexPageCard
              title="共有する"
              message="クイズができたら、クイズのURLやコードを友達に教えて、準備しましょう！"
              image={<img src="assets/index/share.svg" />}
            />
            <IndexPageCard
              title="みんなであそぶ"
              message="クイズであそんでみましょう！"
              image={<img src="assets/index/playtogether.svg" />}
            />
          </div>
        </PageContainer>

        <style jsx>
          {`
            .IndexPage {
              &_title {
                font-size: 36px;
                line-height: 49px;
                margin-top: 0;
                margin-bottom: 50px;
                @media (max-width: 750px) {
                  font-size: 1.8rem;
                  line-height: 1.5;
                }
              }
              &_cards {
                display: grid;
                gap: 30px;
                grid-template-columns: repeat(
                  auto-fit,
                  [col-start] minmax(350px, 1fr) [col-end]
                );
                :global(.IndexPageCard:nth-of-type(2)) {
                  margin-top: 50px;
                }
                :global(.IndexPageCard:nth-of-type(3)) {
                  margin-top: 100px;
                }

                @media (max-width: 1170px) {
                  display: flex;
                  overflow-x: auto;
                  transform: translateX(-20px);
                  width: calc(100% + 40px);
                  padding-left: 30px;
                  gap: initial;

                  scroll-snap-type: x mandatory;
                  scroll-behavior: smooth;
                  :global(.IndexPageCard) {
                    scroll-snap-align: start;
                    margin-left: 30px;
                    width: 350px;
                    min-width: 350px;
                    &:first-of-type {
                      margin-left: 0px;
                    }
                  }

                  :global(.IndexPageCard:nth-of-type(2)) {
                    margin-top: 0px;
                  }
                  :global(.IndexPageCard:nth-of-type(3)) {
                    margin-top: 0px;
                  }
                }
                @media (max-width: 750px) {
                  display: grid;
                  grid-template-columns: 1fr;
                  transform: none;
                  width: 100%;
                  padding-left: 0;
                  gap: 30px;
                  :global(.IndexPageCard) {
                    width: 100%;
                    min-width: initial;
                    margin-left: initial;
                  }
                }
              }
            }
            .IndexPageHeader {
              position: relative;
              z-index: 0;
              background-color: var(--mainAccentColor);
              background-size: auto auto;
              background-image: var(--mainBackgroundPattern);
              --IndexPageHeaderHeight: 700px;
              height: var(--IndexPageHeaderHeight);
              @media (max-width: 520px) {
                text-align: center;
              }
              &_info {
                position: absolute;
                z-index: 1;
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
                  margin-bottom: 50px;
                }
              }
              &_infoBreakpoint {
                display: none;
                @media (max-width: 520px) {
                  display: block;
                }
              }
              &_image {
                position: absolute;
                z-index: -1;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                @media (max-width: 1000px) {
                  display: none;
                }
              }
              :global(.PageAccentWave) {
                height: 70px;
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                fill: var(--mainBackgroundColor);
                @media (max-width: 750px) {
                  height: 50px;
                }
              }
            }
          `}
        </style>
      </div>
    </>
  )
}

export const IndexPageCard: React.FunctionComponent<{
  title: string
  message: string
  image: React.ReactNode
}> = (props) => {
  return (
    <div className="IndexPageCard">
      <div className="IndexPageCard_title">
        <h3>{props.title}</h3>
        <svg
          width="353"
          height="40"
          viewBox="0 0 353 40"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 25.5856L14.7083 28.424C29.4167 31.3157 58.8333 36.9125 88.25 39.0846C117.667 41.1768 147.083 39.8442 176.5 33.4078C205.917 27.0514 235.333 15.5912 264.75 14.2186C294.167 12.7928 323.583 21.3213 338.292 25.5856L353 29.8498V0H338.292C323.583 0 294.167 0 264.75 0C235.333 0 205.917 0 176.5 0C147.083 0 117.667 0 88.25 0C58.8333 0 29.4167 0 14.7083 0H0V25.5856Z"
            fill="#FFE600"
          />
        </svg>
      </div>
      <div className="IndexPageCard_body">
        <div className="IndexPageCard_image">{props.image}</div>
        <p className="IndexPageCard_message">{props.message}</p>
      </div>
      <style jsx>
        {`
          .IndexPageCard {
            height: 500px;
            border-radius: 30px;
            overflow: hidden;
            background-color: white;

            @media (max-width: 750px) {
              height: auto;
            }

            &_title {
              position: relative;
              padding-top: 30px;
              background-color: var(--mainAccentColor);
              height: 70px;
              margin-bottom: 40px;
              h3 {
                margin: 0;
                font-size: 28px;
                line-height: 38px;
                text-align: center;
              }
              svg {
                position: absolute;
                width: 100%;
              }
            }
            &_body {
              position: relative;
              height: 390px;
              @media (max-width: 750px) {
                height: 300px;
              }
            }
            &_image {
              height: 311px;
              display: flex;
              justify-content: center;
              @media (max-width: 750px) {
                padding: 15px 0;
                height: 210px;
              }
              img {
                height: 100%;
              }
            }
            &_message {
              position: absolute;
              bottom: 30px;
              margin: 0;
              padding: 0 20px;
              font-weight: bold;
              font-size: 1rem;
              color: #9e9e9e;
              width: 100%;
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  )
}
