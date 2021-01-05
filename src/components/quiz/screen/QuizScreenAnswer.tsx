import { useContext } from 'react'
import {
  QuestionAnswerGraph,
  QuestionSelectCard,
  QuestionSelectGrid,
  QuestionTitle,
} from '@components/question'
import { QuizButton, QuizNote, QuizContext } from '@components/quiz'

export const QuizScreenAnswer: React.FunctionComponent = () => {
  const {
    question,
    isApiLoading,
    isMainAnswer,
    isCorrectAnswer,
    getRemainingQuestionCount,
    isRemainingQuizExists,
    goNextQuestion,
    goStatusArchiveScreen,
  } = useContext(QuizContext)

  return (
    <>
      <QuestionTitle title={question?.title}></QuestionTitle>

      <QuestionSelectGrid>
        <QuestionSelectCard
          title={question?.choice[question.answer].title}
          index={'A'}
          type="selected"
          style={{ cursor: 'default' }}
        />
        <QuizNote title={isCorrectAnswer() ? '😚正解！' : '😥不正解...'}>
          <p>
            正解は「
            <strong>
              {`${question.answer + 1}. ${
                question?.choice[question.answer].title
              }`}
            </strong>
            」
          </p>
          {question?.commentary && <p>{question.commentary}</p>}
        </QuizNote>
      </QuestionSelectGrid>

      <div
        style={{
          textAlign: 'right',
          marginTop: 'var(--mainNormalPaddingSize)',
        }}>
        <p>のこり{getRemainingQuestionCount()}問です！</p>

        {isRemainingQuizExists() ? (
          <>
            <QuizButton
              text="次の問題へ進む"
              onClick={() => isMainAnswer() && goNextQuestion()}
              disabled={!isMainAnswer()}
            />
          </>
        ) : (
          <>
            <QuizButton
              text="全ての結果を見る"
              isLoading={isApiLoading}
              onClick={() => isMainAnswer() && goStatusArchiveScreen()}
              disabled={!isMainAnswer()}
            />
          </>
        )}
      </div>

      <QuizNote
        title="😏みんなのこたえ"
        style={{
          marginTop: 'calc(var(--mainNormalPaddingSize) * 2)',
        }}>
        <QuestionAnswerGraph
          data={question.choice}
          correctAnswer={question.answer}
        />
      </QuizNote>
    </>
  )
}
