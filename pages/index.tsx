import { NextSeo } from 'next-seo'
import Image from 'next/image'
import React, { ReactElement } from 'react'

import { PageAccentWave, PageButton, PageContainer } from '@components/ui'
import { QuizInviteCodeForm } from '@components/quiz'
import Link from 'next/link'

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
          <section className="IndexPageSection">
            <h2 className="IndexPage_title IndexPage_title-center">
              たのしく、かんたんに
              <br />
              クイズ大会をひらいてみよう!
            </h2>
            <p className="IndexPage_description IndexPage_description-center">
              ちょっとしたミニゲームみたいに、場を盛り上げたりするのにぴったり！
            </p>
            <div className="IndexPage_cardsImage">
              <div className="IndexPage_cardsImage_wrap">
                <IndexPageCardImage
                  title="みんなで"
                  message="つくったクイズを、ともだちと一緒に解いてみよう!"
                  image={<img src="assets/index/for-friends.svg" />}
                />
              </div>
              <div className="IndexPage_cardsImage_wrap">
                <IndexPageCardImage
                  title="ひとりで"
                  message="問題をつくったり、だれかが作ったクイズを解いてみよう!"
                  image={<img src="assets/index/for-one.svg" />}
                />
              </div>
              <div className="IndexPage_cardsImage_wrap">
                <IndexPageCardImage
                  title="たくさんで"
                  message="イベントなどQRコードを共有して、クイズ大会を開いてみよう!"
                  image={<img src="assets/index/for-everyone.svg" />}
                />
              </div>
            </div>
          </section>

          <section className="IndexPageSection">
            <h2 className="IndexPage_title">クイズ大会のひらきかた</h2>
            <p className="IndexPage_description">
              たのしいクイズ大会をひらくには？
            </p>
            <div className="IndexPage_cardsHowTo">
              <IndexPageCard
                title="つくる"
                message="あなただけのクイズをつくってみましょう！"
                image={<img src="assets/index/create.svg" />}
                screenshot={
                  <Image
                    src="/assets/index/create-screen.png"
                    width="120px"
                    height="260px"
                  />
                }
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
                screenshot={
                  <Image
                    src="/assets/index/for-everyone-screen.png"
                    width="120px"
                    height="260px"
                  />
                }
              />
            </div>
          </section>

          <section className="IndexPageInvite IndexPageSection">
            <div>
              <h2 className="IndexPageInvite_title">
                いますぐクイズを
                <br />
                作ってみませんか？
              </h2>
              <Link href="/dashboard">
                <a>
                  <PageButton style={{ width: '100%' }} buttontype="big">
                    クイズをつくってみる!
                  </PageButton>
                </a>
              </Link>
            </div>
          </section>
        </PageContainer>

        <style jsx>
          {`
            .IndexPageInvite {
              position: relative;
              padding: 50px;
              background-color: #ffffff;
              border-radius: 40px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              z-index: 0;
              @media (max-width: 650px) {
                grid-template-columns: 1fr;
                padding: 80px 20px;
              }
              &_title {
                margin-top: 0;
                font-size: 28px;
                line-height: 38px;
                margin-bottom: 40px;
              }
              &:before {
                z-index: -1;
                position: absolute;
                top: 50%;
                right: 200px;
                transform: translateY(-50%);
                content: 'Q';
                font-size: 290px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.1);
                opacity: 0.5;
                @media (max-width: 650px) {
                  right: 50px;
                  opacity: 0.3;
                }
              }
              &:after {
                @extend .IndexPageInvite:before;
                z-index: -2;
                content: 'A';
                right: 50px;
                color: var(--mainAccentColor);
                opacity: 0.3;
                @media (max-width: 650px) {
                  display: none;
                }
              }
            }
            .IndexPage {
              &Section {
                & + & {
                  margin-top: 150px;
                  @media (max-width: 750px) {
                    margin-top: 100px;
                  }
                }
              }
              &_title {
                font-size: 36px;
                line-height: 49px;
                margin-top: 0;
                margin-bottom: 0;
                &-center {
                  text-align: center;
                }
                @media (max-width: 750px) {
                  font-size: 1.8rem;
                  line-height: 1.5;
                }
              }
              &_description {
                font-size: 1rem;
                margin-top: 0;
                margin-bottom: 50px;
                &-center {
                  text-align: center;
                }
              }
              &_title + &_description {
                margin-top: 40px;
                @media (max-width: 750px) {
                  margin-top: 20px;
                }
              }
              &_cardsImage {
                display: grid;
                gap: 100px;
                grid-template-columns: 1fr 1fr;

                width: calc(100% + 16%);
                transform: translateX(-8%);
                @media (max-width: 1600px) {
                  gap: 70px;
                  width: 100%;
                  transform: none;
                }
                @media (max-width: 950px) {
                  grid-template-columns: 1fr;
                  gap: 30px;
                }
                &_wrap {
                  &:nth-of-type(2) {
                    grid-row: 1/3;
                    grid-column: 2;
                    display: flex;
                    align-items: center;
                    :global(.IndexPageCardImage) {
                      width: 100%;
                    }
                    :global(.IndexPageCardImage_body) {
                      left: initial;
                      right: 0px;
                      transform: translate(-30px, 0);
                    }
                    @media (max-width: 950px) {
                      grid-row: initial;
                      grid-column: initial;
                      :global(.IndexPageCardImage_body) {
                        transform: translate(0, 0);
                      }
                    }
                  }

                  @media (max-width: 950px) {
                    :global(.IndexPageCardImage_body) {
                      transform: translate(0, 0);
                    }
                  }
                }
              }
              &_cardsHowTo {
                display: grid;
                gap: 30px;
                grid-template-columns: 1fr 1fr 1fr;
                :global(.IndexPageCard:nth-of-type(2)) {
                  margin-top: 50px;
                }
                :global(.IndexPageCard:nth-of-type(3)) {
                  margin-top: 100px;
                }
                @media (max-width: 1010px) {
                  grid-template-columns: 1fr;
                }
                @media (max-width: 750px) {
                  transform: none;
                  width: 100%;
                  padding-left: 0;
                  :global(.IndexPageCard) {
                    width: 100%;
                    min-width: initial;
                    margin-left: initial;
                    margin-top: 0 !important;
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

export const IndexPageCardImage: React.FunctionComponent<{
  title: string
  message: string
  image: React.ReactNode
}> = (props) => {
  return (
    <div className="IndexPageCardImage">
      {props.image}
      <div className="IndexPageCardImage_body">
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
        <h3 className="IndexPageCardImage_title">{props.title}</h3>
        <h3 className="IndexPageCardImage_message">{props.message}</h3>
      </div>
      <style jsx>
        {`
          .IndexPageCardImage {
            position: relative;
            height: 450px;
            width: 100%;
            padding-bottom: 50px;
            background-color: white;
            border-radius: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 50px;
            @media (max-width: 950px) {
              height: 400px;
              padding: 10px 20px 110px;
            }
            :global(img) {
              @media (max-width: 750px) {
                width: 100%;
                height: 250px;
              }
            }
            &_body {
              position: absolute;
              bottom: 0;
              left: 0;
              width: auto;
              background-color: var(--mainAccentColor);
              padding: 30px 30px 0px;
              transform: translate(30px, 0px);
              @media (max-width: 750px) {
                padding: 30px 30px 0px;
              }
              svg {
                width: 100%;
                height: 50px;
                bottom: -50px;
                left: 0;
                position: absolute;
              }
            }
            &_title {
              font-size: 28px;
              line-height: 38px;
              margin: 0;
            }
            &_message {
              font-size: 1rem;
              margin: 0;
              opacity: 0.5;
            }
            &_title + &_message {
              margin-top: 15px;
              @media (max-width: 750px) {
                margin-top: 10px;
              }
            }
          }
        `}
      </style>
    </div>
  )
}

export const IndexPageCard: React.FunctionComponent<{
  title: string
  message: string
  image: React.ReactNode
  screenshot?: React.ReactNode
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
        {props.screenshot && (
          <div className="IndexPageCard_screenshot">{props.screenshot}</div>
        )}
      </div>
      <style jsx>
        {`
          .IndexPageCard {
            width: 100%;
            height: 500px;
            border-radius: 30px;
            background-color: white;

            @media (max-width: 750px) {
              height: auto;
            }

            &_title {
              position: relative;
              padding-top: 30px;
              border-radius: 30px 30px 0 0;
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
              ${props.screenshot && 'width: calc(100% - 100px);'}
            }
            &_screenshot {
              position: absolute;
              bottom: -20px;
              right: -20px;
              box-shadow: var(--mainBoxShadow);
              border-radius: 15px;
              @media (max-width: 750px) {
                bottom: -10px;
                right: -10px;
              }
            }
          }
        `}
      </style>
    </div>
  )
}
