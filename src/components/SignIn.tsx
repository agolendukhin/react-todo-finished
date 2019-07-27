import React from 'react'
import firebase from 'firebase'
import { withFirebase } from './firebase'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { History } from 'history'
import { default as SignIn } from './Button'

// center positioning acc to
// https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers

const OuterDiv = styled.div`
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

const MiddleDiv = styled.div`
  display: table-cell;
  vertical-align: middle;
`

const InnerDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
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
    <OuterDiv>
      <MiddleDiv>
        <InnerDiv>
          <h1>Todos</h1>
          <SignIn
            onClick={() =>
              props.firebase
                .signInWithPopUp()
                .then(() => props.history.push('/'))
            }>
            Sign in
          </SignIn>
        </InnerDiv>
      </MiddleDiv>
    </OuterDiv>
  )
}

export default compose(
  withFirebase,
  withRouter
)(SignInScreen) as React.ComponentType
