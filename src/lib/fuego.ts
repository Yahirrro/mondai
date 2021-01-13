import firebase from 'firebase/app'

type Config = Parameters<typeof firebase.initializeApp>[0]

export class Fuego {
  public length: typeof firebase.apps.length
  public db: ReturnType<firebase.app.App['firestore']>
  public auth: typeof firebase.auth
  public functions: typeof firebase.functions
  public storage: typeof firebase.storage
  public analytics: typeof firebase.analytics
  public performance: typeof firebase.performance
  constructor(config: Config) {
    this.length = firebase.apps.length
    this.db = !firebase.apps.length
      ? firebase.initializeApp(config).firestore()
      : firebase.app().firestore()
    this.auth = firebase.auth
    this.functions = firebase.functions
    this.storage = firebase.storage
    this.analytics = firebase.analytics
    this.performance = firebase.performance
  }
}
