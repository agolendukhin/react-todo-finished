import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import EditInput from './EditInput'
import { initialStateMock } from '../../mockData'
import { RootState, Todo } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('Edit todo', () => {
  it('should update todo', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    let todos = todosSelector(store.getState() as RootState)
    let todo = todos.find((todo: Todo) => todo.id == 1)

    const component = mount(
      <EditInput
        store={store}
        todo={todo}
        resetLiClassName={() => {}}></EditInput>
    )

    const newTodoText = 'New todo'

    const input = component.find('input')

    input.simulate('change', { target: { value: newTodoText } })
    input.simulate('blur')

    todos = todosSelector(store.getState() as RootState)
    todo = todos.find((todo: Todo) => todo.id == 1)
    const todoText = todo ? todo.text : ''

    expect(todoText).toEqual(newTodoText)
  })
})
