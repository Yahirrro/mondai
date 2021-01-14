import { Fuego } from '@lib/fuego'
import { fuego } from '@nandorojo/swr-firestore'

export const sendLogEvent = async (
  eventName: string,
  eventParams?: {
    [key: string]: any
  },
  options?: any
): Promise<any> => {
  ;(fuego as Fuego).analytics()?.logEvent(eventName, eventParams, options)
}
