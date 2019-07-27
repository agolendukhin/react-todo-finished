import React from 'react'
import styled from 'styled-components'

// center positioning acc to
// https://stackoverflow.com/questions/396145/how-to-vertically-center-a-div-for-all-browsers

const OuterDiv = styled.div`
  width: 100%;
  padding: 0;
  display: table;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
`

const MiddleDiv = styled.div`
  padding: 0;
  vertical-align: middle;
  display: table-cell;
  margin: 0;
`

const InnerDiv = styled.div`
  width: 64px;
  margin: 0 auto;
`

const CenterComponent: React.FC<{}> = props => (
  <OuterDiv>
    <MiddleDiv>
      <InnerDiv>{props.children}</InnerDiv>
    </MiddleDiv>
  </OuterDiv>
)

export default CenterComponent
