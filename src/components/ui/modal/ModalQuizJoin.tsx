import { useDocument } from '@nandorojo/swr-firestore'
import { useAuthentication } from '@hook/auth'
import { useUI } from '@components/ui/context'
import { PageButton } from '@components/ui'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import { QuizModel } from '@models'

export const ModalQuizJoin: React.FunctionComponent = () => {
  const user = useAuthentication()
  const router = useRouter()
  const { closeModal } = useUI()

  const { data: quiz } = useDocument<QuizModel>(
    router.query.quizId ? `quiz/${router.query.quizId}` : null,
    {
      listen: false,
    }
  )

  const { set: setQuizUser } = useDocument<any>(
    user?.userId ? `quiz/${router.query.quizId}/user/${user?.userId}` : null
  )

  const submitJoinQuiz = () => {
    setQuizUser({
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    closeModal()
  }

  return (
    <>
      <div className="PageModal_info">
        <h1 className="PageModal_title">｢{quiz?.title}｣に参加する!</h1>
        <p className="PageModal_description">
          ボタンをクリックして、｢{quiz?.title}｣に今すぐ参加しましょう!
        </p>
      </div>

      <PageButton
        onClick={submitJoinQuiz}
        style={{ width: '100%', fontSize: '1.5rem', height: '52px' }}>
        参加する!
      </PageButton>
    </>
  )
}
