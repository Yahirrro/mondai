import { useContext, useEffect, useState } from 'react'
import { PageNumber, PageButton } from '@components/ui'
import { QuestionAnswerGraph } from '@components/question'

import {
  QuizContext,
  QuizNote,
  QuizAllCorrectUsers,
  QuizCorrectCardBig,
} from '@components/quiz'
import { DashboardCard } from '@components/dashboard/DashboardCard'
import { useCollection } from '@nandorojo/swr-firestore'
import { getIdToken } from '@lib/api'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const QuizScreenArchive: React.FunctionComponent = () => {
  const [apiLoading, setApiLoading] = useState<boolean>(false)

  const router = useRouter()
  const { quiz, userAnswer, getCorrectRate } = useContext(QuizContext)
  const { data: message } = useCollection<{
    percent: number
    message: string
  }>(quiz?.exists && `quiz/${quiz.id}/message`, {
    where: ['percent', '<=', getCorrectRate()],
    limit: 1,
    orderBy: ['percent', 'desc'],
    listen: true,
  })

  const deplicate = async (quizId) => {
    const get = async (): Promise<{ quizId: string }> => {
      try {
        setApiLoading(true)
        const data = await fetch(`/api/quiz/deplicate?quizId=` + quizId, {
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
      {userAnswer && (
        <DashboardCard title="すべての問題が終わりました😆">
          <QuizCorrectCardBig />
          {message?.length > 0 && (
            <QuizNote
              title={`💮正答率が${
                message?.length > 0 && message[0]?.percent * 100
              }%${message[0]?.percent == 1 ? '' : '以上'}でした!`}
              style={{ backgroundColor: 'var(--mainAccentColor)' }}>
              <p>{message?.length > 0 && message[0]?.message}</p>
            </QuizNote>
          )}
        </DashboardCard>
      )}

      <section className="QuizScreenAnswer_grid">
        <div>
          <h3>🎉すべての参加者数</h3>
          <PageNumber number={quiz?.allUser} unit="人" />
        </div>
        <div>
          <h3>🤩すべて正解した人数</h3>
          <PageNumber number={quiz?.allCorrectUser?.length} unit="人" />
        </div>
        <div className="QuizScreenAnswer_grid-full">
          <h3>💮すべて正解した人</h3>
          <QuizAllCorrectUsers />
        </div>
      </section>

      {(quiz.permission.playagain || quiz.playagain?.isPlayagain) && (
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
            onClick={() =>
              deplicate(
                quiz.playagain?.isPlayagain ? quiz.playagain.original : quiz.id
              )
            }
            style={{ width: '100%', marginTop: '20px' }}
            disabled={apiLoading}>
            このクイズであそぶ！
          </PageButton>
        </QuizNote>
      )}

      <QuizNote title="😏みんなのこたえ">
        <QuizScreenArchiveGraph />
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
            }
            @media (max-width: 750px) {
              margin-top: calc(var(--mainNormalPaddingSize) * 2.5);
              margin-bottom: calc(var(--mainNormalPaddingSize) * 2.5);
            }
            &-full {
              @media (max-width: 1400px) {
                grid-column: 1/3;
              }
            }
            h3 {
              margin-top: 0;
            }
          }
        `}
      </style>
    </>
  )
}

export const QuizScreenArchiveGraph: React.FunctionComponent = () => {
  const { quiz, userAnswer, allQuestion } = useContext(QuizContext)
  const [isSpoiler, setIsSpoiler] = useState<boolean>(
    userAnswer?.length == undefined
  )

  useEffect(() => {
    if (userAnswer?.length > 0) setIsSpoiler(false)
  }, [userAnswer?.length])
  return (
    <>
      <div
        onClick={() => {
          setIsSpoiler(false)
        }}
        className={
          isSpoiler
            ? 'QuizScreenAnswer_answers QuizScreenAnswer_answers-spoiler'
            : 'QuizScreenAnswer_answers'
        }>
        {quiz?.flow?.map((data, index) => {
          if (!allQuestion) return
          const questionData = allQuestion?.find(
            (element) => element.id == data
          )
          return (
            <QuestionAnswerGraph
              key={index + questionData.title}
              data={questionData.choice}
              correctAnswer={questionData.answer}
              title={index + 1 + '. ' + questionData.title}
            />
          )
        })}
        {isSpoiler && (
          <figure className="QuizScreenAnswer_answersDescription">
            ネタバレ注意のため、非表示にしています🤔
          </figure>
        )}
      </div>
      <style jsx>
        {`
          .QuizScreenAnswer_answers {
            width: 100%;
            height: auto;
          }
          .QuizScreenAnswer_answers-spoiler {
            position: relative;
            overflow: hidden;
            height: 300px;
            width: 100%;
            border-radius: 20px;
            cursor: pointer;
            &:before {
              content: '';
              position: absolute;
              z-index: 1;
              top: 0;
              width: 100%;
              height: 300px;
              backdrop-filter: blur(30px);
              border-radius: 20px;
              background-color: rgba(0, 0, 0, 0.1);
            }
            &:after {
              white-space: pre;
              text-align: center;
              content: 'タップで表示!';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translateY(-50%) translateX(-50%);
              z-index: 2;
              background-color: white;
              padding: 10px 20px;
              border-radius: 40px;
              font-weight: bold;
            }
          }
          .QuizScreenAnswer_answersDescription {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 30px;
            z-index: 1;
            margin: 0;
            width: 250px;
            text-align: center;
            font-weight: bold;
          }
        `}
      </style>
    </>
  )
}
