import { Field, FieldArrayRenderProps } from 'formik'
import React from 'react'
import { IconIncorrect, PageFormInput } from '@components/ui'

type Props = {
  index: number
  isCorrectAnswer: boolean
  setAnswer: (value: React.SetStateAction<number>) => void
  arrayHelpers: FieldArrayRenderProps
}

export const DashboardQuestionChoiceEdit: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <>
      <div
        className={`DashboardQuestionSelect${
          props.isCorrectAnswer ? ' DashboardQuestionSelect-correctAnswer' : ''
        }`}>
        <h3 className="DashboardQuestionSelect_title">
          <Field
            as={PageFormInput}
            name={`choice[${props.index}].title`}
            type="text"
            required
          />
        </h3>
        <div className="DashboardQuestionSelect_buttonGroup">
          {!props.isCorrectAnswer && (
            <button
              type="button"
              className="DashboardQuestionSelect_button-correctAnswer"
              onClick={() => {
                props.setAnswer(props.index)
              }}
              title="正解にする">
              💯
            </button>
          )}
          <button
            type="button"
            className="DashboardQuestionSelect_button-remove"
            title="削除する"
            onClick={() => {
              props.arrayHelpers.remove(props.index)
            }}>
            <IconIncorrect />
          </button>
        </div>
        <style jsx>
          {`
            .DashboardQuestionSelect {
              counter-increment: index;
              user-select: none;
              cursor: pointer;
              position: relative;
              background: #ffffff;
              border: 1px solid #e6e6e6;
              box-sizing: border-box;
              border-radius: 20px;
              height: 80px;
              padding: 0 20px;
              display: grid;
              grid-template-columns: 1fr 110px;
              gap: var(--mainNormalPaddingSize);
              transition: all 0.4s;
              @media (max-width: 750px) {
                padding: 10px 20px;
                height: initial;
                grid-template-columns: 1fr;
                gap: 0px;
                width: calc(100% + 20px);
                transform: translateX(-10px);
              }
              &-correctAnswer {
                background-color: var(--mainAccentColor);
              }
              &_title {
                margin: 0;
                display: flex;
                align-items: center;
                &:before {
                  content: counter(index);
                  font-weight: bold;
                  font-size: 4rem;
                  line-height: 1;
                  margin-right: 20px;
                  min-width: 40px;
                  text-align: center;
                  color: rgba(0, 0, 0, 0.34);
                  @media (max-width: 1100px) {
                    margin-right: 10px;
                  }
                }
              }
              &_buttonGroup {
                display: grid;
                grid-template-columns: 50px 50px;
                gap: 10px;
                align-items: center;
                @media (max-width: 750px) {
                  grid-template-columns: 1fr 50px 50px;
                }
              }
              &_button {
                position: relative;
                cursor: pointer;
                width: 50px;
                height: 50px;
                padding: 10px;
                border: none;
                background: white;
                border-radius: 50%;
                border: 1px solid #e6e6e6;
                margin-bottom: 16px;
                &:before {
                  font-family: var(--mainFontFamily);
                  position: absolute;
                  left: 0;
                  bottom: -20px;
                  width: 50px;
                  opacity: 0.6;
                }
                &-correctAnswer {
                  @extend .DashboardQuestionSelect_button;
                  background-color: var(--mainAccentColor);
                  grid-column: 1;
                  @media (max-width: 750px) {
                    grid-column: 2;
                  }
                  &:before {
                    content: '正解に';
                  }
                }
                &-remove {
                  @extend .DashboardQuestionSelect_button;
                  grid-column: 2;
                  @media (max-width: 750px) {
                    grid-column: 3;
                  }
                  &:before {
                    content: '削除';
                  }
                }
                :global(svg) {
                  width: 28px;
                  height: 28px;
                }
              }
              &_input {
                position: absolute;
                right: 30px;
              }
              & + & {
                margin-top: 10px;
                @media (max-width: 750px) {
                  margin-top: 20px;
                }
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
