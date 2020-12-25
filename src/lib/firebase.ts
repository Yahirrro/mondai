import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

import { firebaseConfig } from '@lib/firebaseConfig'

if (firebase.apps.length === 0) {
  // よみこみ
  !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()
}
