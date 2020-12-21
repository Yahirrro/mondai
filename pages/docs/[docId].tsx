import { QuizCard } from '@components/ui'
import React from 'react'

type Props = {
  params: any
}

export default function Home(props: Props): React.ReactElement {
  return (
    <QuizCard title="利用規約" description="当サイトを利用するにあたって" />
  )
}
