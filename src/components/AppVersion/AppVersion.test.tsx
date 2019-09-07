import { shallow } from 'enzyme'
import React from 'react'
import { appVersion } from '../../utils'
import AppVersion from './AppVersion'

describe('App version', () => {
  it('should render correctly App Version commponent', () => {
    const component = shallow(<AppVersion />)

    expect(component.text()).toEqual(`Version: ${appVersion}`)
  })
})
