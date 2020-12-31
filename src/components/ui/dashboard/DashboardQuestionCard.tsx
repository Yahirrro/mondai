import { QuestionModel, QuizModel } from '@models'
import { QuestionTitle } from '@components/ui'

type Props = {
  index: number
  quiz: QuizModel
  question: QuestionModel
  type?: 'small'
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const DashboardQuestionCard: React.FunctionComponent<Props> = (
  props
) => {
  return (
    <>
      <article
        key={props.question.id}
        className={`DashboardQuestionCard${
          props.type ? ` DashboardQuestionCard-${props.type}` : ''
        }`}
        onClick={props.onClick}>
        <QuestionTitle type="mini" title={props.question?.title} />
        <div className="DashboardQuestionCard_info">
          <p>{props.index + 1}問目</p>
          <p>
            <strong>答え: </strong>
            {props.question.choice[props.question.answer].title}
          </p>
        </div>
        <style jsx>
          {`
            .DashboardQuestionCard {
              cursor: pointer;
              display: grid;
              grid-template-columns: 1fr;
              gap: 10px;
              padding: 35px 20px 20px;
              border-radius: 30px;
              background: #ffffff;
              &-small {
                border-radius: 20px;
                padding: 20px;
                :global(.QuestionTitle-mini) {
                  margin-left: 0;
                  font-size: 1.2rem;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  &:before {
                    display: none;
                  }
                }
                .DashboardQuestionCard_info {
                  overflow: hidden;
                  margin-left: 0px;
                  align-self: self-end;
                  p {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              }
              &_info {
                opacity: 0.5;
                margin-left: 40px;
                @media (max-width: 750px) {
                  margin-left: 0;
                }
                p,
                h2 {
                  margin: 0;
                }
              }
              & + & {
                margin-top: 20px;
              }
            }
          `}
        </style>
      </article>
    </>
  )
}
