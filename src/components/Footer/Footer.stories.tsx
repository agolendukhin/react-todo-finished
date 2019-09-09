import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import configureMockStore from 'redux-mock-store'
import { APP_NAME } from '../../utils'

import Footer from './Footer'
import { initialStateMock } from '../../mockData'

const store = configureMockStore()(initialStateMock)

storiesOf(APP_NAME, module).add('Footer', () => (
  <Provider store={store}>
    <Footer activeTodosCount={3} completedTodosCount={2}></Footer>
  </Provider>
))
