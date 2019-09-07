import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import ClearCompleted from './ClearCompleted'
import { initialStateMock } from '../../mockData'
import { RootState } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('Clear Completed', () => {
  it('should clear completed tasks', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    const component = mount(
      <ClearCompleted display store={store}></ClearCompleted>
    )

    component.find('button').simulate('click')

    const {
      todos: { todos },
    } = store.getState() as RootState

    expect(todos).toHaveLength(2)
  })
})
