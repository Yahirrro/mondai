import { useDocument } from '@nandorojo/swr-firestore'
import { TopicCard } from '@components/topic'
import { TopicModel } from '@models'

export const TopicCardGet: React.FunctionComponent<{
  topicId: string
  style?: React.CSSProperties
}> = (props) => {
  const { data: TopicData } = useDocument(`topic/${props.topicId}`)
  if (!TopicData?.exists) return <></>
  return (
    <div style={{ marginBottom: '30px', width: '100%', ...props.style }}>
      {TopicData && (
        <TopicCard topic={TopicData as TopicModel} style={{ width: '100%' }} />
      )}
    </div>
  )
}
