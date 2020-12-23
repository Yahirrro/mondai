import { QuizModel } from '@components/models'
import { useCollection } from '@nandorojo/swr-firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const QuizInviteCodeForm: React.FunctionComponent = () => {
  const router = useRouter()
  const [inviteCode, setInviteCode] = useState<number>(null)
  const { data: quiz } = useCollection<QuizModel>(
    String(inviteCode).length == 5 ? `quiz` : null,
    {
      where: ['inviteCode', '==', inviteCode],
      listen: true,
    }
  )

  useEffect(() => {
    quiz?.find((data) => {
      data.inviteCode == inviteCode
      router.push(`/quiz/${data.id}`)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz])

  return (
    <>
      <form className="QuizInviteCodeForm">
        <h3>コードを入力して今すぐ参加</h3>
        <div className="QuizInviteCodeForm_input">
          <input
            placeholder="_____"
            type="number"
            pattern="\d*"
            maxLength={5}
            onChange={(object) => {
              if (object.target.value.length > object.target.maxLength) {
                object.target.value = object.target.value.slice(
                  0,
                  object.target.maxLength
                )
              }
              setInviteCode(Number(object.target.value))
            }}
          />
        </div>
      </form>
      <style jsx>
        {`
          .QuizInviteCodeForm {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            @media (max-width: 520px) {
              flex-flow: wrap;
            }
            h3 {
              margin-top: 0;
              margin-bottom: 0;
              @media (max-width: 520px) {
                margin-bottom: 20px;
              }
            }
            &_input {
              position: relative;
              font-weight: bold;
              font-size: 30px;
              line-height: 36px;
              margin-left: 20px;
              @media (max-width: 520px) {
                margin-left: 0;
              }
              &:before {
                content: '#';
                font-weight: bold;
                font-size: 30px;
                line-height: 36px;
                position: absolute;
                left: 20px;
                width: 20px;
                height: 50px;
                text-align: center;
                display: flex;
                align-items: center;
              }
              input {
                padding: 10px 15px 10px 50px;
                border-radius: 50px;
                height: 50px;
                border: none;
                outline: none;
                font-family: var(--mainFontFamily);
                font-weight: bold;
                font-size: 24px;
                line-height: 29px;
                letter-spacing: 0.3em;
                width: 181px;
                &::placeholder {
                  opacity: 0.2;
                }
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
            }
          }
        `}
      </style>
    </>
  )
}