import { useContext, useState } from 'react'
import { PageNumber, PageButton } from '@components/ui'
import { QuestionAnswerGraph } from '@components/question'

import { QuizContext, QuizNote } from '@components/quiz'
import { useCollection } from '@nandorojo/swr-firestore'
import { getIdToken } from '@lib/api'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const QuizScreenArchive: React.FunctionComponent = () => {
  const [apiLoading, setApiLoading] = useState<boolean>(false)

  const router = useRouter()
  const { quiz, allQuestion, getCorrectRate } = useContext(QuizContext)
  const { data: message } = useCollection<{
    percent: number
    message: string
  }>(quiz?.exists && `quiz/${quiz.id}/message`, {
    where: ['percent', '<=', getCorrectRate()],
    limit: 1,
    orderBy: ['percent', 'desc'],
    listen: true,
  })

  const deplicate = async () => {
    const get = async (): Promise<{ quizId: string }> => {
      try {
        setApiLoading(true)
        const data = await fetch(`/api/quiz/deplicate?quizId=` + quiz.id, {
          headers: { authorization: 'Bearer ' + (await getIdToken()) },
        })
        setApiLoading(false)
        toast('😆あそぶ準備ができました!')
        return data.json()
      } catch (error) {
        setApiLoading(false)
        toast('😥処理にしっぱいしました')
        console.error(error)
      }
    }
    router.push(`/quiz/${(await get()).quizId}`)
    return
  }

  return (
    <>
      <h2>全ての問題が終了しました！</h2>

      <section className="QuizScreenAnswer_grid">
        <div>
          <h3>すべての参加者数🎉</h3>
          <PageNumber number={quiz?.allUser} unit="人" />
        </div>
        <div>
          <h3>ぜんぶ正解した人🎉</h3>
          <PageNumber number={quiz?.allCorrectUser?.length} unit="人" />
        </div>
        {message?.length > 0 && (
          <QuizNote
            title={`💮正答率が${
              message?.length > 0 && message[0]?.percent * 100
            }%${message[0]?.percent == 1 ? '' : '以上'}でした!`}
            style={{ backgroundColor: 'var(--mainAccentColor)' }}>
            <p>{message?.length > 0 && message[0]?.message}</p>
          </QuizNote>
        )}
      </section>
      {quiz.permission.playagain && (
        <QuizNote
          title={`もう一度｢${quiz.title}｣であそびましょう🙌`}
          style={{ padding: '40px 30px' }}>
          <p>
            いますぐあそんでみよう！
            <br />
            ひとりでも、ともだちとでも、いますぐあそべます!
          </p>
          <PageButton
            buttontype="big"
            onClick={() => deplicate()}
            style={{ width: '100%', marginTop: '20px' }}
            disabled={apiLoading}>
            このクイズであそぶ！
          </PageButton>
        </QuizNote>
      )}

      <QuizNote title="😏みんなのこたえ">
        {quiz?.flow?.map((data, index) => {
          if (!allQuestion) return
          const questionData = allQuestion?.find(
            (element) => element.id == data
          )
          return (
            <QuestionAnswerGraph
              key={questionData.title}
              data={questionData.choice}
              correctAnswer={questionData.answer}
              title={index + 1 + '. ' + questionData.title}
            />
          )
        })}
      </QuizNote>

      <style jsx>
        {`
          .QuizScreenAnswer_grid {
            display: grid;
            grid-template-columns: 300px 250px 1fr;
            gap: var(--mainNormalPaddingSize);
            margin-top: calc(var(--mainNormalPaddingSize) * 1.5);
            margin-bottom: var(--mainNormalPaddingSize);
            @media (max-width: 1400px) {
              grid-template-columns: 1fr 1fr;
              :global(.QuizNote) {
                grid-column: 1/3;
              }
            }
          }
        `}
      </style>
    </>
  )
}
