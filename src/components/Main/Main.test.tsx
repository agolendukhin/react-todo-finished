import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Main from './Main'
import { initialStateMock, firebaseMock } from '../../mockData'
import { RootState, IAnyState } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'
import { FirebaseContext } from '../../firebase'
import { Alert } from 'antd'
import { removeError } from '../../store/errors'
import { act } from 'react-dom/test-utils'

const rootReducer = combineReducers(reducers)

describe('Main', () => {
  let store = createMockStoreWithReducers({}, (state: IAnyState) => state)
  let component = mount(<div></div>)

  beforeEach(() => {
    store = createMockStoreWithReducers(initialStateMock, rootReducer as any)
    component = mount(
      <Provider store={store}>
        <FirebaseContext.Provider value={firebaseMock}>
          <Main store={store}></Main>
        </FirebaseContext.Provider>
      </Provider>
    )
  })

  it('should toggle all todos', () => {
    const toggleAllLabel = component.find('#toggle-all-label')
    toggleAllLabel.simulate('click')

    const todos = todosSelector(store.getState() as RootState)

    const completedCount = todos.filter(t => t.completed).length

    expect(todos.length).toEqual(completedCount)
  })

  it('should remove error', () => {
    const alertsBefore = component.find(Alert)

    act(() => {
      store.dispatch(removeError('1'))
    })

    component.update()

    const alertsAfter = component.find(Alert)

    expect(alertsBefore.length).toEqual(alertsAfter.length + 1)
  })
})
