import React from 'react'
import { combineReducers } from 'redux'
import { mount } from 'enzyme'
import Filters from './Filters'
import { initialStateMock } from '../../mock'
import { RootState, Todo } from '../../Types'
import * as reducers from '../../store/reducers'
import { createMockStoreWithReducers, todosSelector } from '../../utils'

const rootReducer = combineReducers(reducers)

describe('Filters', () => {
  it('Check filter changes classnames', () => {
    const store = createMockStoreWithReducers(
      initialStateMock,
      rootReducer as any
    )

    const component = mount(<Filters store={store}></Filters>)

    let completedElement = component.find('a[href="#/completed"]')

    completedElement.simulate('click')

    completedElement = component.find('a[href="#/completed"]')

    expect(completedElement.hasClass('selected')).toBeTruthy()
  })
})
