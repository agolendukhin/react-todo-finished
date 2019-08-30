import React from 'react'
import { appVersion } from '../../utils'
import styled from 'styled-components'

const AppVersion = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  /* Portrait iPhones */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    bottom: 10px;
    right: 10px;
  }
  color: #4d4d4d;
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 300;
`

export default () => <AppVersion>{`Version: ${appVersion}`}</AppVersion>
