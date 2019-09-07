import React from 'react'
import { mount, render, shallow } from 'enzyme'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Loading from '../Loading'

describe('Private Route', () => {
  it('should render test component', () => {
    const TestComponent = () => <div id="test-component"></div>
    const component = mount(
      <BrowserRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={TestComponent}></PrivateRoute>
      </BrowserRouter>
    )

    expect(component.find(TestComponent)).toHaveLength(1)
  })

  it('should render loading component', () => {
    const TestComponent = () => <div id="test-component"></div>
    const component = mount(
      <BrowserRouter>
        <PrivateRoute
          isAuthenticating={true}
          component={TestComponent}></PrivateRoute>
      </BrowserRouter>
    )

    expect(component.find(Loading)).toHaveLength(1)
  })

  it('should redirect', () => {
    const TestComponent = () => <div id="test-component"></div>
    const component = shallow(
      <BrowserRouter>
        <PrivateRoute component={TestComponent}></PrivateRoute>
      </BrowserRouter>
    ) as any

    expect(component.find('Router').prop('history').location.pathname).toEqual(
      '/'
    )
  })
})
