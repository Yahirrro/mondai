import { NextSeo } from 'next-seo'
import Image from 'next/image'
import React, { ReactElement } from 'react'

import {
  PageAccentWave,
  PageContainer,
  QuizInviteCodeForm,
} from '@components/ui'

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
          <h2>参加しよう</h2>
        </PageContainer>

        <style jsx>
          {`
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
