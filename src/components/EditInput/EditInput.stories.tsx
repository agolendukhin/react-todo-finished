import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react'
import configureMockStore from 'redux-mock-store'
import { APP_NAME } from '../../utils'

import EditInput from './EditInput'
import { initialStateMock } from '../../mockData'

const store = configureMockStore()(initialStateMock)

storiesOf(APP_NAME, module).add('EditInput', () => (
  <Provider store={store}>
    <EditInput resetLiClassName={() => {}}></EditInput>
  </Provider>
))
