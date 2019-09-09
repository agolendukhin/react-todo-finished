import React from 'react'
import firebase from 'firebase'
import { withFirebase } from '../../firebase'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { History } from 'history'
import { Button } from '../Button'
import { CenterComponent } from '../CenterComponent'

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
      <Button
        onClick={() =>
          props.firebase.signInWithPopUp().then(() => props.history.push('/'))
        }>
        Sign in
      </Button>
    </CenterComponent>
  )
}

export default compose(
  withFirebase,
  withRouter
)(SignInScreen) as React.ComponentType
