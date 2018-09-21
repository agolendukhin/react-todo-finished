import React, { Component } from 'react'
import get from 'lodash/get'

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
    const { todo, handleEditTodoFinished, resetLiClassName } = this.props

    handleEditTodoFinished({
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

export default EditInput
