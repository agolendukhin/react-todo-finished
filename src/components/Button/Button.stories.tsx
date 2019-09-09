import React from 'react'
import { storiesOf } from '@storybook/react'
import { APP_NAME } from '../../utils'

import Button from './Button'

storiesOf(APP_NAME, module).add('Button', () => <Button>{APP_NAME}</Button>)
