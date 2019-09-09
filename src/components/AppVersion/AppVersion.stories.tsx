import React from 'react'
import { storiesOf } from '@storybook/react'
import { APP_NAME } from '../../utils'

import AppVersion from './AppVersion'

storiesOf(`${APP_NAME}`, module).add('App Version', () => <AppVersion />)
