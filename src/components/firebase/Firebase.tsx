import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { Component } from 'react'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

app.initializeApp(config)

const auth = app.auth()
export const db = app.firestore()

interface IProps {
  children: any
}

interface IState {
  loading: boolean
  user: any
}

class Firebase extends Component<IProps, IState> {
  public auth: app.auth.Auth
  public googleAuthProvider: app.auth.GoogleAuthProvider
  public db: app.firestore.Firestore

  constructor(props: IProps) {
    super(props)

    this.auth = auth
    this.db = db
    this.googleAuthProvider = new app.auth.GoogleAuthProvider()

    this.state = {
      loading: true,
      user: null,
    }
  }

  componentDidMount() {
    this.auth.onAuthStateChanged(user => {
      this.setState({ user, loading: false })
    })
  }

  signOut = () => this.auth.signOut()

  signInWithPopUp = () =>
    this.auth
      .signInWithPopup(this.googleAuthProvider)
      .then(({ user }) => this.setState({ user }))

  render() {
    const { user, loading } = this.state

    return this.props.children({
      user,
      loading,
      db: this.db,
      signInWithPopUp: this.signInWithPopUp,
      signOut: this.signOut,
      googleAuthProvider: this.googleAuthProvider,
    })
  }
}

export default Firebase
