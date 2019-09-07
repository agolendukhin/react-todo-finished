import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import ToggleTodo from './ToggleTodo'
import { initialStateMock } from '../../mockData'
import { RootState, Todo } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('Toggle todo', () => {
  it('should update todo', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    let todos = todosSelector(store.getState() as RootState)
    let todo = todos.find((todo: Todo) => todo.id == 1)

    const component = mount(<ToggleTodo store={store} todo={todo}></ToggleTodo>)

    const input = component.find('input')

    input.simulate('change', { target: { checked: true } })

    todos = todosSelector(store.getState() as RootState)
    todo = todos.find((todo: Todo) => todo.id == 1)

    const completed = todo ? todo.completed : false

    expect(completed).toBeTruthy()
  })
})
