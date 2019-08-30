import React from 'react'
import { shallow } from 'enzyme'
import CenterComponent, { InnerDiv } from './CenterComponent'

describe('Center Component', () => {
  it('should render Test Component inside Center Component', () => {
    const TestComponent = () => <div></div>
    const component = shallow(
      <CenterComponent>
        <TestComponent></TestComponent>
      </CenterComponent>
    )

    expect(component.contains(<TestComponent />)).toBeTruthy()
  })
})
