import React from 'react'
import firebase from 'firebase'
import { withFirebase } from './firebase'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { History } from 'history'
import { default as SignIn } from './Button'

const Header = styled.div`
  text-align: center;
  position: absolute;
  top: 44%;
  right: 50%;
  h1 {
    font: 36px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
  }
`

interface Ifirebase extends firebase.app.App {
  signInWithPopUp(): Promise<any>
}

interface Props {
  firebase: Ifirebase
  history: History
}

const SignInScreen: React.FC<Props> = props => {
  return (
    <Header>
      <h1>Todos</h1>
      <SignIn
        onClick={() =>
          props.firebase.signInWithPopUp().then(() => props.history.push('/'))
        }>
        Sign in
      </SignIn>
    </Header>
  )
}

export default compose(
  withFirebase,
  withRouter
)(SignInScreen) as React.ComponentType
