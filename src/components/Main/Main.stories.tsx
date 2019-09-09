import React from 'react'
import 'antd/lib/alert/style/index.css'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import configureMockStore from 'redux-mock-store'
import { FirebaseContext } from '../../firebase'
import { APP_NAME } from '../../utils'
import Main from './Main'
import { initialStateMock, firebaseMock } from '../../mockData'

const store = configureMockStore()(initialStateMock)

storiesOf(APP_NAME, module).add('Main', () => (
  <Provider store={store}>
    <FirebaseContext.Provider value={firebaseMock}>
      <Main></Main>
    </FirebaseContext.Provider>
  </Provider>
))
