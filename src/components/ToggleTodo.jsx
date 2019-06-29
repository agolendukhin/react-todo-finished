import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateTodo } from '../store/actions'

class ToggleTodo extends Component {
  render() {
    const { todo, updateTodo } = this.props
    return (
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
      />
    )
  }
}

export default connect(
  ({ todos }) => ({ todos }),
  dispatch =>
    bindActionCreators(
      {
        updateTodo,
      },
      dispatch
    )
)(ToggleTodo)
