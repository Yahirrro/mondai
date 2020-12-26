import { useContext } from 'react'
import {
  QuestionSelect,
  QuestionSelectGrid,
  QuestionTitle,
  QuizButton,
  QuizNote,
} from '@components/ui'

import { QuizContext } from '@components/ui'

export const QuizScreenOpen: React.FunctionComponent = () => {
  const {
    question,
    isAnswered,
    isApiLoading,
    submitAnswer,
    isMainAnswer,
    goStatusAnswerScreen,
    answerValue,
    setAnswerValue,
  } = useContext(QuizContext)

  return (
    <>
      <QuestionTitle title={question?.title}></QuestionTitle>
      {!isAnswered ? (
        //回答前
        <form onSubmit={submitAnswer}>
          <QuestionSelectGrid>
            {question.choice.map((data, index) => {
              return (
                <QuestionSelect
                  key={data.title}
                  title={data.title}
                  index={(index + 1).toString()}>
                  <input
                    type="radio"
                    id={data.title}
                    name={question.title}
                    value={data.title}
                    onChange={() => {
                      setAnswerValue(question.choice.indexOf(data))
                    }}></input>
                </QuestionSelect>
              )
            })}
          </QuestionSelectGrid>
          <div
            style={{
              textAlign: 'right',
            }}>
            <QuizButton
              text="解答する"
              type="submit"
              disabled={answerValue == null}
            />
          </div>
        </form>
      ) : (
        // 回答済み
        <>
          <QuizNote title={'🤔結果はどうだ'} style={{ marginTop: '50px' }}>
            <p>
              {isMainAnswer()
                ? 'あなたはメイン回答者です。「結果を見るボタン」をクリックすると、集計が開始され、すべての参加者の答えを確認できます！みんなの様子をみながらボタンを押すといいかもです！'
                : 'メイン回答者が次へすすむと、自動的に次の画面が表示されます！ゆったり結果が表示されるのを待ちましょう！'}
            </p>
          </QuizNote>
          <div
            style={{
              textAlign: 'right',
              marginTop: 'var(--mainNormalPaddingSize)',
            }}>
            {isMainAnswer() ? (
              <>
                <QuizButton
                  text="結果を見る"
                  isLoading={isApiLoading}
                  onClick={() => goStatusAnswerScreen()}
                />
              </>
            ) : (
              <QuizButton text="結果を見る" disabled />
            )}
          </div>
        </>
      )}
    </>
  )
}
