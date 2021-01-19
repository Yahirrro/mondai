import { TutorialModal } from '@components/tutorial'

const pageProps = [
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-edit-1.png',
    title: '問題をつくろう',
    description: 'あなただけの問題をどんどんふやしてみてください!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-edit-2.png',
    title: 'メッセージを添えて',
    description:
      '正解率ごとに好きなメッセージを追加できます! 全く追加しなくてもいいよ!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-edit-3.png',
    title: '｢クイズであそぶ｣をタップ!',
    description: 'クイズ大会を開く準備をはじめます!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-quiz-edit-4.png',
    title: 'クイズをあそんでみよう!',
    description: 'ひとりや、みんなで一緒にクイズをといてみよう!',
    className: 'TutorialModal_image-top',
  },
]

export const TutorialQuizEdit: React.FunctionComponent = () => {
  return (
    <TutorialModal
      localStorageKey="has-got-tutorial-quiz-edit"
      pageProps={pageProps}
    />
  )
}
