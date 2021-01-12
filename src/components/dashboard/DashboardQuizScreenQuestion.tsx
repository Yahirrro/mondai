import { IconAdd, PageButton } from '@components/ui'
import {
  DashboardQuestionCard,
  DashboardQuizContext,
} from '@components/dashboard'
import { QuizNote } from '@components/quiz'
import { useDashboardQuizUI } from '@hook/dashboard'
import { useContext, useEffect } from 'react'

export const DashboardQuizScreenQuestion: React.FunctionComponent = () => {
  const { quiz, questions } = useContext(DashboardQuizContext)
  const { dashboardQuizUI, setDashboardQuizUI } = useDashboardQuizUI()

  useEffect(() => {
    console.log(quiz, questions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardQuizUI?.open])

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

        {quiz?.flow.length == 0 && (
          <QuizNote title="😉問題を追加してみましょう!">
            <p>
              右上にある「➕問題をふやす」をおして、問題をふやしてみましょう😆
            </p>
          </QuizNote>
        )}
      </div>

      {quiz?.flow.length > 2 && (
        <div
          style={{
            marginTop: '30px',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
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
      )}
    </>
  )
}
