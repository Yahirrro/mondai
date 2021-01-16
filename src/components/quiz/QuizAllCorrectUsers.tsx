import { useContext } from 'react'
import { QuizContext } from '@components/quiz'
import { useDocument } from '@nandorojo/swr-firestore'
import { UserModel } from '@models'
import { IconFace } from '@components/ui'

export const QuizAllCorrectUsers: React.FunctionComponent = () => {
  const shuffle = (array) => {
    if (array == []) return
    let currentIndex = array.length,
      temporaryValue,
      randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    return array
  }
  const { quiz } = useContext(QuizContext)
  const allCorrectUser = shuffle(quiz?.allCorrectUser).slice(0, 5)

  return (
    <div className="QuizAllCorrectUsers">
      {quiz?.allCorrectUser.length == 0 && <div>いませんでした...</div>}
      {quiz?.allCorrectUser.length > 0 && (
        <div className="QuizAllCorrectUsers_flex">
          {allCorrectUser.map((data) => {
            return <QuizAllCorrectUserName key={data} userId={data} />
          })}
        </div>
      )}

      {quiz?.allCorrectUser.length > 5 && (
        <div className="QuizAllCorrectUsers_info">
          さんなど{quiz?.allCorrectUser.length}人
        </div>
      )}

      <style jsx>
        {`
          .QuizAllCorrectUsers {
            &_flex {
              display: inline-flex;
              flex-wrap: wrap;
              margin: -12px 0 0 -12px;
              width: calc(100% + 12px);
            }
            &_info {
              text-align: right;
              font-weight: bold;
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  )
}

const QuizAllCorrectUserName: React.FunctionComponent<{
  userId: string
}> = (props) => {
  const { data: userData } = useDocument<UserModel>(
    props.userId ? `user/${props.userId}` : null
  )

  return (
    <div className="QuizAllCorrectUserName">
      <IconFace />
      <p>{userData?.userName}</p>

      <style jsx>
        {`
          .QuizAllCorrectUserName {
            display: inline-grid;
            grid-template-columns: 24px 1fr;
            gap: 5px;
            background-color: var(--mainAccentColor);
            padding: 5px 15px;
            border-radius: 20px;
            margin: 12px 0 0 12px;
            p {
              font-weight: bold;
              margin: 0;
              align-self: center;
            }
          }
        `}
      </style>
    </div>
  )
}
