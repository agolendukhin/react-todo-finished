import React, { Component } from 'react'

class Header extends Component {
  render() {
    const {
      handleNewTodoChange,
      handleNewTodoKeyPress,
      newTodoText,
    } = this.props
    return (
      <header>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={handleNewTodoChange}
          onKeyPress={handleNewTodoKeyPress}
          value={newTodoText}
        />
      </header>
    )
  }
}

export default Header
