import {
  DashboardQuizContext,
  DashboardQuizFormEditDetail,
  PageButton,
  QuestionAnswerGraph,
  QuizNote,
  ScreenLoading,
} from '@components/ui'
import Link from 'next/link'
import React, { useContext } from 'react'

export const DashboardQuizScreenDetail: React.FunctionComponent = () => {
  const { quiz, questions } = useContext(DashboardQuizContext)
  return (
    <>
      {quiz?.currentStatus == 'creating' && (
        <QuizNote title="🎨クイズの詳細">
          {!quiz ? (
            <ScreenLoading style={{ backgroundColor: 'white' }} />
          ) : (
            <DashboardQuizFormEditDetail quizId={quiz?.id} />
          )}
        </QuizNote>
      )}
      {quiz?.currentStatus == 'waiting' && (
        <QuizNote title="😆クイズ大会をはじめましょう！">
          <p>
            表示されている🔌QRコードか、📋5桁の番号
            を参加者に伝えて、クイズ大会に参加してもらおう！
          </p>
          <p>
            メイン回答者は、クイズ画面にて「🔵はじめる」をクリックすると、クイズ大会がはじまるよ！
          </p>
          <Link href={`/quiz/${quiz?.id}`}>
            <a style={{ marginTop: '1rem' }}>
              <PageButton>クイズ大会ページ</PageButton>
            </a>
          </Link>
        </QuizNote>
      )}
      {(quiz?.currentStatus == 'open' || quiz?.currentStatus == 'answer') && (
        <QuizNote title="😲もうクイズ大会はじまってるよ！">
          <p>のりおくれないで💨</p>
          <p>
            メイン回答者の動きに合わせて、参加者みんなの画面が切り替わります🎈
            <br />
            解答を見るときも気をつけてね😙
          </p>
          <Link href={`/quiz/${quiz?.id}`}>
            <a style={{ marginTop: '1rem' }}>
              <PageButton>クイズ大会ページ</PageButton>
            </a>
          </Link>
        </QuizNote>
      )}
      {quiz?.currentStatus == 'archive' && (
        <>
          <QuizNote title="😍おつかれ！">
            <p>クイズ大会おつかれさまでした👺</p>
            <p>
              みなさんの反応はいかがでしたか？🤔
              <br />
              たのしんでもらえたなら、またmondaiをつかってクイズ大会をひらいてみてください😘
            </p>
          </QuizNote>
          <QuizNote title="😏みんなのこたえ">
            {quiz?.flow?.map((data, index) => {
              if (!questions) return
              const questionData = questions?.find(
                (element) => element.id == data
              )
              return (
                <QuestionAnswerGraph
                  key={questionData?.title}
                  data={questionData?.choice}
                  correctAnswer={questionData?.answer}
                  title={index + 1 + '. ' + questionData?.title}
                />
              )
            })}
          </QuizNote>
        </>
      )}
    </>
  )
}
