import React from 'react'
import { storiesOf } from '@storybook/react'
import { APP_NAME } from '../../utils'

import CenterComponent from './CenterComponent'
import { Button } from '../Button'

storiesOf(APP_NAME, module).add('Center Component', () => (
  <CenterComponent>
    <Button>Center button</Button>
  </CenterComponent>
))
