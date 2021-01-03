import { useAuthentication } from '@hook/auth'
import { fuego } from '@nandorojo/swr-firestore'
import { useEffect } from 'react'
import { useUI } from '@components/ui/context'

export const ModalLogin: React.FunctionComponent = () => {
  const user = useAuthentication()
  const { closeModal } = useUI()

  useEffect(() => {
    if (user !== null) {
      closeModal()
    }
  }, [closeModal, user])

  return (
    <>
      <div className="PageModal_info">
        <h1 className="PageModal_title">🤩ログインしよう!</h1>
        <p className="PageModal_description">
          クイズに参加するには、ログインする必要があります!
        </p>
      </div>
      <button
        className="LoginButton-google"
        onClick={() => {
          const googleAuthProvider = new fuego.auth.GoogleAuthProvider()
          fuego.auth().signInWithPopup(googleAuthProvider)
        }}>
        Googleでログイン
      </button>
      <p style={{ fontSize: '14px', marginBottom: 0, opacity: 0.5 }}>
        ログインした時点で、当サービスの利用規約に同意します
        <br />
        アカウント認証とサービス利用に必要な情報のみ利用し、個人情報などの取得は行いません
      </p>
      <style jsx>
        {`
          .LoginButton {
            user-select: none;
            color: #4c7b57;
            border: 1px solid #7f9c7d;
            outline: none;
            background-color: white;
            width: 100%;
            display: inline-block;
            cursor: pointer;
            text-decoration: none;
            font-size: 18px;
            font-weight: 700;
            line-height: 20px;
            height: 50px;
            box-sizing: border-box;
            text-align: center;
            border-radius: 25px;
            align-items: center;
            display: flex;
            justify-content: center;
            font-family: Inter, Arial, Helvetica Neue, Hiragino Kaku Gothic ProN,
              Noto Sans JP, -apple-system, BlinkMacSystemFont, Segoe UI,
              sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
              Noto Color Emoji;
            &-google {
              @extend .LoginButton;
              color: #4285f4;
              border: 1px solid rgba(66, 133, 244, 0.5);
            }
          }
        `}
      </style>
    </>
  )
}
