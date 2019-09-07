import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Todo from './Todo'
import { initialStateMock } from '../../mock'
import { RootState } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('Todo', () => {
  it('renders active count', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    let todos = todosSelector(store.getState() as RootState)
    const todo2delete = todos[0]
    const initialTodosLength = todos.length

    const component = mount(
      <Provider store={store}>
        <Todo todo={todo2delete}></Todo>
      </Provider>
    )

    const destroyButton = component.find('.destroy')
    destroyButton.simulate('click')

    todos = todosSelector(store.getState() as RootState)

    expect(todos.length).toEqual(initialTodosLength - 1)
  })
})
