import React, { Component } from 'react'

class EditInput extends Component {
  render() {
    const {
      display,
      todo,
      handleEditTodoOnChange,
      handleBlur,
      handleEditTodoKeyPress,
    } = this.props

    if (!display) {
      return <input className="edit" />
    }

    return (
      <input
        className="edit"
        ref={input => input && input.focus()}
        value={todo.text}
        onChange={e => handleEditTodoOnChange(todo.id, e)}
        handleBlur={() => handleBlur(todo.completed)}
        onKeyPress={e => handleEditTodoKeyPress(e)}
      />
    )
  }
}

export default EditInput
