import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { clearCompleted } from '../store/actions'

const ClearCompletedButton = props => {
  const { display, clearCompleted } = props

  if (!display) return null

  return (
    <button className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  )
}

export default connect(
  ({ todos, filters }) => ({ todos, filters }),
  dispatch =>
    bindActionCreators(
      {
        clearCompleted,
      },
      dispatch
    )
)(ClearCompletedButton)
