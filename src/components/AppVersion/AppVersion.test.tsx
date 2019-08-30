import { appVersion } from '../../utils'
import React from 'react'
import { shallow } from 'enzyme'
import AppVersion from './AppVersion'

describe('App version', () => {
  it('should render correctly App Version commponent', () => {
    const component = shallow(<AppVersion />)

    expect(component.text()).toEqual(`Version: ${appVersion}`)
  })
})
