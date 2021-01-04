import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const QuizInviteCodeForm: React.FunctionComponent = () => {
  const router = useRouter()
  const [inviteCode, setInviteCode] = useState<string>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const submitInviteCode = async (): Promise<{
    status: string
    data: string
  }> => {
    try {
      setIsLoading(true)
      const data = await fetch(`/api/quiz/goQuiz?inviteCode=` + inviteCode)
      setIsLoading(false)

      if (data.status == 200) {
        toast('😆クイズ大会がみつかりました!')
        router.push(`/quiz/${(await data.json()).data}`)
      } else {
        toast.error('😫クイズ大会がみつかりませんでした...')
      }
      return
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(inviteCode)
    if (inviteCode?.length == 5) {
      setIsLoading(true)
      submitInviteCode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteCode])

  return (
    <>
      <form className="QuizInviteCodeForm">
        <label className="QuizInviteCodeForm_label">
          <p className="QuizInviteCodeForm_text">コードを入力して今すぐ参加</p>
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
                setInviteCode(object.target.value)
              }}
            />
            {isLoading && (
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                xmlns="http://www.w3.org/2000/svg"
                stroke="black">
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(1 1)" strokeWidth="2">
                    <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                </g>
              </svg>
            )}
          </div>
        </label>
      </form>
      <style jsx>
        {`
          .QuizInviteCodeForm {
            font-weight: bold;
            font-size: 18px;
            line-height: 25px;
            &_label {
              display: flex;
              flex-direction: row;
              align-items: center;
              @media (max-width: 520px) {
                flex-flow: wrap;
                justify-content: center;
              }
            }
            &_text {
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
              display: flex;
              align-items: center;
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
                box-shadow: var(--mainBoxShadow);
                &::placeholder {
                  opacity: 0.2;
                }
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
              }
              svg {
                margin-left: 10px;
              }
            }
          }
        `}
      </style>
    </>
  )
}
