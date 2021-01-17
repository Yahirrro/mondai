import { TopicModel } from '@models'
import React from 'react'
import { TopicCard } from '@components/topic'

type Props = {
  topics: Array<TopicModel>
}

export const TopicSlider: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="TopicSlider">
      <div className="TopicSlider_slider">
        {props.topics?.map((data) => {
          return (
            <div className="TopicSlider_card" key={data.id}>
              <TopicCard topic={data} />
            </div>
          )
        })}
      </div>
      <style jsx>
        {`
          .TopicSlider {
            position: relative;
            height: 84px;
            &_slider {
              position: absolute;
              width: calc(100% + 30px);
              transform: translateX(-15px);

              overflow-x: auto;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;

              display: fixed;
            }
            &_card {
              scroll-snap-align: start;
              padding-left: 15px;
              &:last-of-type {
                padding-right: 15px;
              }
            }
            :global(.TopicCard) {
              width: 350px;
              @media (max-width: 550px) {
                width: 80vw;
              }
            }
          }
        `}
      </style>
    </div>
  )
}
