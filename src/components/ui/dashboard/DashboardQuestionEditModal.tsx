import { QuestionModel } from '@models'
import { useDocument } from '@nandorojo/swr-firestore'
import { useContext } from 'react'
import { DashboardContext } from '..'
import { PageButton, PageFormInput } from '@components/ui'

type Props = {
  questionId: string
}
export const DashboardQuestionEditModal: React.FunctionComponent<Props> = (
  props
) => {
  const { quiz } = useContext(DashboardContext)
  const { data: question } = useDocument<QuestionModel>(
    props.questionId ? `quiz/${quiz.id}/question/${props.questionId}` : null,
    {
      listen: true,
    }
  )
  console.log(props.questionId)
  return (
    <>
      <div className="PageModal_info">
        <h1 className="PageModal_title">{question?.title}</h1>
      </div>
      {question?.choice.map((choice, index) => {
        return (
          <label
            key={choice.title}
            className={`DashboardQuestionSelect${
              question.answer == index
                ? ' DashboardQuestionSelect-correctAnswer'
                : ''
            }`}>
            <h3 className="DashboardQuestionSelect_title">
              <PageFormInput
                type="text"
                defaultValue={choice.title}
                onChange={(event) => console.log(event.target.value)}
              />
            </h3>
            {question.answer !== index && (
              <PageButton style={{ position: 'absolute', right: '30px' }}>
                正解にする
              </PageButton>
            )}
            {/* <input
              className="DashboardQuestionSelect_input"
              type="radio"
              name={`questionId${question.id}`}
              value={index}
              defaultChecked={question.answer == index}
            /> */}
          </label>
        )
      })}
      <div style={{ marginTop: '40px' }}>
        <p className="PageModal_description">{question?.commentary}</p>
        <PageButton style={{ width: '100%' }}>更新する</PageButton>
      </div>

      <style jsx>
        {`
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
    </>
  )
}
