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
          return <TopicCard key={data.id} topic={data} />
        })}
      </div>
      <style jsx>
        {`
          .TopicSlider {
            &_slider {
              overflow-x: auto;
              display: grid;
              grid-auto-flow: column;
              grid-auto-columns: 380px;
              gap: 20px;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
              @media (max-width: 750px) {
                grid-auto-columns: 300px;
                gap: 15px;
              }
            }
          }
        `}
      </style>
    </div>
  )
}
