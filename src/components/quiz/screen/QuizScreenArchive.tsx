import React, { useContext, useEffect, useState } from 'react'
import { PageNumber, PageButton, IconLoading } from '@components/ui'
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
import { useAuthentication } from '@hook/auth'
import { useUI } from '@components/ui/context'

export const QuizScreenArchive: React.FunctionComponent = () => {
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
        <QuizScreenArchivePlayagain />
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

const QuizScreenArchivePlayagain: React.FunctionComponent = () => {
  const router = useRouter()
  const user = useAuthentication()
  const { openModal, setModalView } = useUI()
  const [apiLoading, setApiLoading] = useState<boolean>(false)
  const { quiz, userAnswer } = useContext(QuizContext)

  const deplicate = async (quizId) => {
    if (!user?.userId) {
      setModalView('LOGIN_VIEW')
      openModal()
      return
    }

    const get = async (): Promise<{ quizId: string }> => {
      if (quizId == undefined) return
      try {
        setApiLoading(true)
        const data = await fetch(`/api/quiz/deplicate?quizId=` + quizId, {
          headers: { authorization: 'Bearer ' + (await getIdToken()) },
        })
        setApiLoading(false)
        toast('😆あそぶ準備ができました!')
        console.log('😆あそぶ準備ができました!' + data)
        return data.json()
      } catch (error) {
        setApiLoading(false)
        toast('😥処理にしっぱいしました')
        console.error(error)
      }
    }
    const data = await get()
    if (data.quizId) {
      router.push(`/quiz/${data.quizId}`)
    } else {
      toast('😥処理にしっぱいしました')
    }
    return
  }

  return (
    <>
      <section className="QuizScreenArchivePlayagain">
        <div className="QuizScreenArchivePlayagain_card">
          <QuizNote
            title={`${userAnswer?.length ? 'もう一度' : ''}「${
              quiz.title
            }」であそびませんか🙌`}>
            <p>
              いますぐあそんでみよう！
              <br />
              ひとりでも、ともだちとでも、いますぐあそべます!
            </p>
            <PageButton
              buttontype="big"
              onClick={() =>
                deplicate(
                  quiz.playagain?.isPlayagain
                    ? quiz.playagain.original
                    : quiz.id
                )
              }
              icon={
                apiLoading ? <IconLoading style={{ stroke: 'black' }} /> : null
              }
              style={{ width: '100%', marginTop: '20px' }}
              disabled={apiLoading}>
              このクイズであそぶ！
            </PageButton>
          </QuizNote>
        </div>
      </section>
      <style jsx>
        {`
          .QuizScreenArchivePlayagain {
            border-radius: 30px;
            background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffe600' fill-opacity='0.5'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            margin-top: var(--mainNormalPaddingSize);
            margin-right: initial;
            margin-bottom: calc(var(--mainNormalPaddingSize) + 25px);
            @media (max-width: 750px) {
              margin-right: 25px;
            }
            &_card {
              margin-left: auto;
              margin-right: auto;
              max-width: 500px;
              transform: translateY(25px);
              @media (max-width: 750px) {
                margin-right: initial;
                transform: translateX(25px) translateY(25px);
              }
            }
          }
        `}
      </style>
    </>
  )
}

const QuizScreenArchiveGraph: React.FunctionComponent = () => {
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
