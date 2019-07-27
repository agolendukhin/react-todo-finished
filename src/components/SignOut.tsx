import styled from 'styled-components'
import Button from './Button'

const SignOut = styled(Button)`
  position: absolute;
  top: 40px;
  right: 40px;
  /* Portrait iPhones */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    top: 10px;
    right: 10px;
  }
`

export default SignOut
