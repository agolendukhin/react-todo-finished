import React from 'react'
import { storiesOf } from '@storybook/react'
import { APP_NAME } from '../../utils'

import Loading from './Loading'

storiesOf(`${APP_NAME}`, module).add('Loading', () => (
  <Loading>Loading</Loading>
))
