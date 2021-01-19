import { TutorialModal } from '@components/tutorial'

const pageProps = [
  {
    imageSrc: '/assets/tutorial/tutorial-owner-quiz-1.png',
    title: '参加してもらおう',
    description:
      'クイズを共有して、ひとりや、みんなと一緒にクイズをといてみよう!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-owner-quiz-2.png',
    title: '人数があつまったら',
    description: '｢はじめる｣をおしてクイズ大会をはじめましょう!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-owner-quiz-3.png',
    title: '一緒にクイズを回答しよう',
    description: '参加者と一緒にクイズを楽しみましょう!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-owner-quiz-4.png',
    title: 'みんな回答したら',
    description: '｢結果を見る｣をおしてみんながどんな回答をしたかみてみよう!',
  },
  {
    imageSrc: '/assets/tutorial/tutorial-owner-quiz-5.png',
    title: 'すべての問題が終わったら',
    description: '｢全ての結果を見る｣をおして最後のページへ!',
  },
]

export const TutorialOwnerQuiz: React.FunctionComponent = () => {
  return (
    <TutorialModal
      localStorageKey="has-got-tutorial-owner-quiz"
      pageProps={pageProps}
    />
  )
}
