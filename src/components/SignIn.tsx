import React from 'react'
import firebase from 'firebase'
import { withFirebase } from './firebase'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { History } from 'history'

const SignIn = styled.button`
  background-color: rgb(255, 255, 255);
  border: 4px;
  border-radius: 0px;
  color: #4d4d4d;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 6px 12px;
  font-weight: 300;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`

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
