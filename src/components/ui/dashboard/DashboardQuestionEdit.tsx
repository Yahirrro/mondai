import React from 'react'
import {
  DashboardFormikField,
  DashboardQuestionChoiceEdit,
  PageButton,
} from '@components/ui'
import { FieldArray, FormikErrors } from 'formik'
import { QuestionModel } from '@models'

type Props = {
  values: {
    title: QuestionModel['title']
    choice: QuestionModel['choice']
    answer: QuestionModel['answer']
  }
  setAnswer: (value: React.SetStateAction<number>) => void
  answer: number
  errors: FormikErrors<{
    title: string
    choice: any[]
    answer: any
    commentary: string
  }>
}

export const DashboardQuestionEdit: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <>
      <div className="DashboardQuestionEdit">
        <DashboardFormikField
          title="🤔問題文"
          description="問題文は、一番読まれる文章です!簡潔に、わかりやすく書くと、より楽しいクイズ大会になります!"
          name="title"
          placeholder="たとえば: 日本の首都は？"
          error={props.errors.title}
        />

        <FieldArray
          name="choice"
          render={(arrayHelpers) => (
            <div>
              {props.values?.choice?.map((choice, index) => {
                const answerData =
                  props.answer == undefined ? props.values.answer : props.answer
                return (
                  <DashboardQuestionChoiceEdit
                    key={index}
                    index={index}
                    isCorrectAnswer={answerData == index}
                    setAnswer={props.setAnswer}
                    arrayHelpers={arrayHelpers}
                  />
                )
              })}

              <div className="DashboardQuestionEdit_addbutton">
                <PageButton
                  type="button"
                  onClick={() => arrayHelpers.push({ title: '' })}>
                  選択肢を追加する
                </PageButton>
              </div>
              <p className="DashboardQuestionEdit_error">
                {props.errors.choice}
              </p>
            </div>
          )}
        />

        <DashboardFormikField
          title="🎉問題の解説文"
          description="問題の解説文は、問題が終わったあと、答え合わせのときに表示されます!"
          name="commentary"
          placeholder="たとえば: 日本の現行法令には「首都圏」の定義は存在するが（首都圏整備法）「首都」についての定義はない。"
          error={props.errors.commentary}
        />

        <style jsx>
          {`
            .DashboardQuestionEdit {
              width: 100%;
              display: grid;
              gap: 30px;
              &_addbutton {
                display: flex;
                margin-top: 20px;
                justify-content: flex-end;
              }
              &_error {
                text-align: right;
                color: rgba(255, 0, 0, 0.6);
                margin-top: 4px;
                margin-bottom: 0;
              }
            }
          `}
        </style>
      </div>
    </>
  )
}
