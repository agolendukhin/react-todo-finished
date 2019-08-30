import React from 'react'
import { shallow } from 'enzyme'
import Button from './Button'

describe('Button', () => {
  it('should look like init snapshot', () => {
    const component = shallow(<Button />)

    expect(component).toMatchSnapshot()
  })
})
