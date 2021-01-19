import { TutorialModal } from '@components/tutorial'

const pageProps = [
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-create-1.png',
    title: 'クイズをつくってみよう!',
    description: 'あなただけのクイズをつくるには、「クイズを作る」をタップ!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-create-2.png',
    title: '絵文字アイコンをえらんで',
    description: 'あなたのクイズにぴったりな絵文字を選んでみよう',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-create-3.png',
    title: 'タイトルを決めて',
    description: 'クイズの顔になるタイトルをきめよう',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-create-4.png',
    title: '説明文を書いて',
    description: 'どんなクイズかわかるひとことを書いてみよう',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-create-5.png',
    title: 'クイズを作成！',
    description: '｢クイズをつくる!｣ボタンを押してクイズを作成しましょう!',
  },
]

export const TutorialQuizCreate: React.FunctionComponent = () => {
  return (
    <TutorialModal
      localStorageKey="has-got-tutorial-quiz-create"
      pageProps={pageProps}
    />
  )
}
