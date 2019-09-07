import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import VisibleTodoList from './VisibleTodoList'
import { Todo } from '../Todo'
import { initialStateMock } from '../../mock'
import { RootState } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('VisibleTodoList', () => {
  it('renders active count', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    let todos = todosSelector(store.getState() as RootState)
    const activeTodosCount = todos.filter(t => !t.completed).length

    const component = mount(
      <Provider store={store}>
        <VisibleTodoList></VisibleTodoList>
      </Provider>
    )

    expect(component.find(Todo).length).toEqual(activeTodosCount)
  })
})
