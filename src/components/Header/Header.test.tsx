import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import Header from './Header'
import { initialStateMock, firebaseMock } from '../../mockData'
import { RootState } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'
import { FirebaseContext } from '../../firebase'

const rootReducer = combineReducers(reducers)

describe('Header', () => {
  it('should add todo', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    let todos = todosSelector(store.getState() as RootState)
    const initialTodosLength = todos.length

    const component = mount(
      <FirebaseContext.Provider value={firebaseMock}>
        <Header store={store}></Header>
      </FirebaseContext.Provider>
    )

    const newTodoText = 'New todo'

    const input = component.find('input')

    input.simulate('change', { target: { value: newTodoText } })
    input.simulate('keypress', { key: 'Enter' })

    todos = todosSelector(store.getState() as RootState)

    expect(todos.length).toEqual(initialTodosLength + 1)
  })
})
