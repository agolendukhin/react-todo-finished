import React from 'react'
import { storiesOf } from '@storybook/react'
import { APP_NAME } from '../../utils'

import SignOut from './SignOut'

storiesOf(`${APP_NAME}`, module).add('Sign Out', () => (
  <SignOut>Sign Out</SignOut>
))
