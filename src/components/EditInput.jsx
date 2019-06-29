import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { get } from 'lodash'

import { updateTodo } from '../store/actions'

class EditInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: get(props, 'todo.text', ''),
    }
  }

  onChange = e => {
    const value = get(e, 'target.value', '')
    this.setState({ value })
  }

  onBlur = () => {
    const { value: text } = this.state
    const { todo, updateTodo, resetLiClassName } = this.props

    updateTodo({
      ...todo,
      text,
    })

    resetLiClassName()
  }

  onKeyPress = e => {
    if (e.key === 'Enter') {
      this.onBlur()
    }
  }

  render() {
    return (
      <input
        className="edit"
        ref={input => input && input.focus()}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
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
)(EditInput)
