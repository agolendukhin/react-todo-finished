import React from 'react'
import { storiesOf } from '@storybook/react'
import { FirebaseContext } from '../../firebase'
import { APP_NAME } from '../../utils'
import SignIn from './SignIn'
import { firebaseMock } from '../../mockData'
import { BrowserRouter } from 'react-router-dom'

storiesOf(APP_NAME, module).add('SignIn', () => (
  <BrowserRouter>
    <FirebaseContext.Provider value={firebaseMock}>
      <SignIn></SignIn>
    </FirebaseContext.Provider>
  </BrowserRouter>
))
