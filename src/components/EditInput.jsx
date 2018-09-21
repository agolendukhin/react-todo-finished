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
    const { todo, liRef, handleEditTodoOnChangeFinished } = this.props

    liRef.current.className = todo.completed ? 'completed' : ''

    handleEditTodoOnChangeFinished({
      ...todo,
      text,
    })
  }

  onKeyPress = e => {
    const { editInputRef } = this.props
    if (e.key === 'Enter') {
      editInputRef.current.blur()
    }
  }

  render() {
    const { display, editInputRef } = this.props

    if (!display) {
      return <input className="edit" />
    }

    return (
      <input
        className="edit"
        ref={editInputRef}
        value={this.state.value}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyPress={this.onKeyPress}
      />
    )
  }
}

export default EditInput
