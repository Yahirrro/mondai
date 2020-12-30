import { QuestionModel, QuizModel } from '@models'
import { useCollection, useDocument } from '@nandorojo/swr-firestore'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import {
  DashboardFormikField,
  DashboardQuestionCard,
  DashboardQuizLayout,
  IconIncorrect,
  PageButton,
  PageFormInput,
  QuizNote,
  ScreenError,
  ScreenLoading,
} from '@components/ui'

import { Formik, Field, Form, FieldArray } from 'formik'
import { useRouter } from 'next/router'

type Props = { params: ParsedUrlQuery }

export default function Home(props: Props): React.ReactElement {
  const router = useRouter()
  const { data: quiz } = useDocument<QuizModel>(
    props.params.quizId ? `quiz/${props.params.quizId}` : null,
    {
      listen: true,
    }
  )
  const { data: questions } = useCollection<QuestionModel>(
    props.params.quizId ? `quiz/${props.params.quizId}/question` : null,
    {
      listen: true,
    }
  )
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
  useEffect(() => {
    setAnswer(question?.answer)
  }, [question?.answer, router.query.questionId])

  if (question !== undefined && question?.exists == false)
    return <ScreenError code={404} />

  return (
    <>
      <DashboardQuizLayout quizId={props.params.quizId as string}>
        <QuizNote title="問題の編集">
          {!question ? (
            <ScreenLoading style={{ backgroundColor: 'white' }} />
          ) : (
            <Formik
              enableReinitialize
              initialValues={question}
              onSubmit={async (value: QuestionModel) => {
                console.log({
                  title: value.title,
                  commentary: value.commentary,
                  answer: answer == undefined ? value.answer : answer,
                  choice: value.choice,
                })
                updateQuestion({
                  title: value.title,
                  commentary: value.commentary,
                  answer: answer == undefined ? value.answer : answer,
                  choice: value.choice,
                })
              }}>
              {({ values }) => (
                <Form style={{ width: '100%' }}>
                  <div className="DashboardQuestionEdit_body">
                    <div>
                      <DashboardFormikField
                        title="🤔問題文"
                        description="問題文は、一番読まれる文章です!簡潔に、わかりやすく書くと、より楽しいクイズ大会になります!"
                        name="title"
                      />
                    </div>

                    <FieldArray
                      name="choice"
                      render={(arrayHelpers) => (
                        <div>
                          {values?.choice.map((choice, index) => {
                            const answerData =
                              answer == undefined ? values.answer : answer
                            return (
                              <div
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
                                    required
                                  />
                                </h3>
                                <div className="DashboardQuestionSelect_buttonGroup">
                                  {answerData !== index && (
                                    <button
                                      className="DashboardQuestionSelect_button-correctAnswer"
                                      onClick={() => {
                                        setAnswer(index)
                                      }}
                                      title="正解にする">
                                      💯
                                    </button>
                                  )}
                                  <button
                                    className="DashboardQuestionSelect_button-remove"
                                    title="削除する"
                                    onClick={() => {
                                      arrayHelpers.remove(index)
                                    }}>
                                    <IconIncorrect />
                                  </button>
                                </div>
                              </div>
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
                              選択肢を追加する
                            </PageButton>
                          </div>
                        </div>
                      )}
                    />

                    <div>
                      <DashboardFormikField
                        title="🎉問題の解説文"
                        description="問題の解説文は、問題が終わったあと、答え合わせのときに表示されます!"
                        name="commentary"
                      />
                    </div>
                  </div>
                  <div>
                    <PageButton
                      type="submit"
                      buttontype="big"
                      style={{
                        marginTop: 'var(--mainNormalPaddingSize)',
                        width: '100%',
                        color: 'white',
                        backgroundColor: 'var(--mainPrimaryColor)',
                      }}>
                      更新する
                    </PageButton>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </QuizNote>
        <h2
          style={{
            marginTop: 'var(--mainNormalPaddingSize)',
            marginBottom: '10px',
          }}>
          別の質問
        </h2>
        <div className="DashboardQuestionCardSlider">
          {quiz?.flow.map((data, index) => {
            const question = questions?.find(
              (questions) => data == questions.id
            )
            if (!question) return
            return (
              <DashboardQuestionCard
                key={question.id}
                index={index}
                quiz={quiz}
                question={question}
                type="small"
              />
            )
          })}
        </div>
        <style jsx>
          {`
            .DashboardQuestionCardSlider {
              display: grid;
              gap: 10px;
              grid-auto-flow: column;
              grid-auto-columns: 300px;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              scroll-behavior: smooth;
              :global(.DashboardQuestionCard) {
                scroll-snap-align: start;
              }
              :global(.DashboardQuestionCard + .DashboardQuestionCard) {
                margin: 0 !important;
              }
            }
            .DashboardQuestionEdit {
              padding: 40px 30px;
              border-radius: 30px;
              background: #ffffff;
              @media (max-width: 1100px) {
                padding: 40px 20px;
              }
              &_info {
                margin-bottom: 40px;
                h1 {
                  margin: 0;
                }
              }
              &_body {
                display: grid;
                gap: 30px;
                label {
                  font-weight: bold;
                }
              }
              &_comment {
                margin-top: 6px;
                margin-bottom: 0;
                font-size: 0.9rem;
                font-weight: normal;
                opacity: 0.6;
              }
            }
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
      </DashboardQuizLayout>
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
