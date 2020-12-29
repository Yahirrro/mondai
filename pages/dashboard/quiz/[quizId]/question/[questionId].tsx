import { QuestionModel } from '@models'
import { useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { useState } from 'react'
import { DashboardLayout, PageButton, PageFormInput } from '@components/ui'

import { Formik, Field, Form, FieldArray } from 'formik'

type Props = { params: ParsedUrlQuery }

export default function Home(props: Props): React.ReactElement {
  const { data: question, update: updateQuestion } = useDocument<QuestionModel>(
    props.params.questionId
      ? `quiz/${props.params.quizId}/question/${props.params.questionId}`
      : null,
    {
      listen: true,
    }
  )
  const [answer, setAnswer] = useState<number>(
    question?.answer && question.answer
  )

  return (
    <>
      <DashboardLayout quizId={props.params.quizId as string}>
        <div className="DashboardQuestionEdit">
          <div className="DashboardQuestionEdit_info">
            <h1 className="DashboardQuestionEdit_title">{question?.title}</h1>
          </div>
          {question && (
            <Formik
              initialValues={question}
              onSubmit={async (value: QuestionModel) => {
                console.log({
                  title: value.title,
                  commentary: value.commentary,
                  answer: answer,
                  choice: value.choice,
                })
                updateQuestion({
                  title: value.title,
                  commentary: value.commentary,
                  answer: answer ? answer : value.answer,
                  choice: value.choice,
                })
              }}>
              {({ values }) => (
                <Form>
                  <div className="DashboardQuestionEdit_body">
                    <div>
                      <label>
                        質問のタイトル
                        <Field as={PageFormInput} name="title" type="text" />
                      </label>
                    </div>

                    <FieldArray
                      name="choice"
                      render={(arrayHelpers) => (
                        <div>
                          {values?.choice.map((choice, index) => {
                            const answerData = answer ? answer : values.answer
                            return (
                              <label
                                key={index}
                                className={`DashboardQuestionSelect${
                                  answerData == index
                                    ? ' DashboardQuestionSelect-correctAnswer'
                                    : ''
                                }`}>
                                <h3 className="DashboardQuestionSelect_title">
                                  <Field
                                    as={PageFormInput}
                                    name={`choice[${index}].title`}
                                    type="text"
                                  />
                                </h3>
                                <div
                                  style={{
                                    position: 'absolute',
                                    right: '30px',
                                    display: 'flex',
                                    gap: '10px',
                                  }}>
                                  <PageButton
                                    type="button"
                                    onClick={() => setAnswer(index)}>
                                    🧨
                                  </PageButton>
                                  <PageButton
                                    type="button"
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}>
                                    ❌
                                  </PageButton>
                                </div>
                              </label>
                            )
                          })}

                          <div
                            style={{
                              display: 'flex',
                              marginTop: '20px',
                              justifyContent: 'flex-end',
                            }}>
                            <PageButton
                              type="button"
                              onClick={() => arrayHelpers.push({ title: '' })}>
                              質問を追加する
                            </PageButton>
                          </div>
                        </div>
                      )}
                    />

                    <div>
                      <label>
                        質問の解説
                        <Field
                          as={PageFormInput}
                          name="commentary"
                          type="text"
                        />
                      </label>
                      {/* <PageFormInput
                    name="commentary"
                    onChange={(event) =>
                      console.log(event.target.value)
                    }></PageFormInput> */}
                    </div>
                  </div>
                  <div>
                    <PageButton type="submit" style={{ width: '100%' }}>
                      更新する
                    </PageButton>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
        <style jsx>
          {`
            .DashboardQuestionEdit {
              padding: 40px 30px;
              border-radius: 30px;
              background: #ffffff;
              &_info {
                margin-bottom: 40px;
                h1 {
                  margin: 0;
                }
              }
              &_body {
                display: grid;
                gap: 50px;
                margin-top: 50px;
                margin-bottom: 50px;
                label {
                  font-weight: bold;
                }
              }
            }
            .DashboardQuestionSelect {
              user-select: none;
              cursor: pointer;
              position: relative;
              background: #ffffff;
              border: 1px solid #e6e6e6;
              box-sizing: border-box;
              border-radius: 20px;
              height: 80px;
              padding: 0 30px;
              display: flex;
              align-items: center;
              &-correctAnswer {
                background-color: var(--mainAccentColor);
              }
              &_title {
              }
              &_input {
                position: absolute;
                right: 30px;
              }
              & + & {
                margin-top: 10px;
              }
            }
          `}
        </style>
      </DashboardLayout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params: params,
    },
    revalidate: 60,
  }
}
