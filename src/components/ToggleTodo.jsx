import React, { Component } from 'react'

class ToggleTodo extends Component {
  render() {
    const { todo, handleToggleTodo } = this.props
    return (
      <input
        className="toggle"
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo.id)}
      />
    )
  }
}

export default ToggleTodo
