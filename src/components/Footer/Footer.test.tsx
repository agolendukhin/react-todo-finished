import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Footer from './Footer'
import { initialStateMock } from '../../mockData'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('Footer', () => {
  it('renders active count', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    const activeTodosCount = 3

    const component = mount(
      <Provider store={store}>
        <Footer activeTodosCount={activeTodosCount}></Footer>
      </Provider>
    )

    expect(component.find('#active-count').text()).toEqual(
      `${activeTodosCount}`
    )
  })
})
