import React from 'react'
import { QuestionSelectCard } from '@components/question'

type Props = {
  title: string
  index: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export const QuestionSelect: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="QuestionSelect" style={{ counterIncrement: 'item' }}>
        {props.children}
        <label htmlFor={props.index + props.title}>
          <QuestionSelectCard title={props.title} index={props.index} />
        </label>
        <style jsx>
          {`
            :global(input[type='radio']) {
              display: none;
            }
            :global(input[type='radio']:checked + label > .QuestionSelectCard) {
              background-color: var(--mainAccentColor);
              background-size: auto auto;
              background-image: var(--mainBackgroundPattern);
              transform: translateY(-10px);
              box-shadow: var(--mainBoxShadow);
            }
          `}
        </style>
      </div>
    </>
  )
}
