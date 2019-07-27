import React from 'react'
import firebase from 'firebase'
import { withFirebase } from './firebase'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { History } from 'history'
import { default as SignIn } from './Button'
import CenterComponent from './CenterComponent'

interface Ifirebase extends firebase.app.App {
  signInWithPopUp(): Promise<any>
}

interface Props {
  firebase: Ifirebase
  history: History
}

const SignInScreen: React.FC<Props> = props => {
  return (
    <CenterComponent>
      <h1 style={{ marginLeft: '-8px' }}>Todos</h1>
      <SignIn
        onClick={() =>
          props.firebase.signInWithPopUp().then(() => props.history.push('/'))
        }>
        Sign in
      </SignIn>
    </CenterComponent>
  )
}

export default compose(
  withFirebase,
  withRouter
)(SignInScreen) as React.ComponentType
