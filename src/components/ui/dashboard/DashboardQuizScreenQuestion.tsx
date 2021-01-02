import {
  DashboardQuestionCard,
  DashboardQuizContext,
  IconAdd,
  PageButton,
} from '@components/ui'
import { useDashboardQuizUI } from '@hook/dashboard'
import { useContext } from 'react'

export const DashboardQuizScreenQuestion: React.FunctionComponent = () => {
  const { quiz, questions } = useContext(DashboardQuizContext)
  const { setDashboardQuizUI } = useDashboardQuizUI()
  return (
    <>
      <header style={{ marginBottom: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div>問題数： {quiz?.flow.length}</div>
          <div>
            <PageButton
              icon={<IconAdd />}
              onClick={() =>
                setDashboardQuizUI({
                  type: 'addQuestion',
                  open: true,
                  optional: { quizId: quiz.id },
                })
              }>
              問題をふやす
            </PageButton>
          </div>
        </div>
      </header>

      <div>
        {quiz?.flow.map((data, index) => {
          const question = questions?.find((questions) => data == questions.id)
          if (!question) return
          return (
            <DashboardQuestionCard
              index={index}
              quiz={quiz}
              question={question}
              key={question.id}
              onClick={() =>
                setDashboardQuizUI({
                  type: 'editQuestion',
                  open: true,
                  optional: {
                    questionId: question.id,
                    questionData: question,
                  },
                })
              }
            />
          )
        })}
      </div>
    </>
  )
}
