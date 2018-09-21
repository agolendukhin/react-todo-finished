import findKey from 'lodash/findKey'
import React, { Component } from 'react'
import Todo from './Todo'

class VisibleTodoList extends Component {
  render() {
    const {
      todos,
      filters,
      handleToggleTodo,
      handleEditTodoOnChange,
      handleEditTodoOnDoubleClick,
      handleRemove,
      handleBlur,
      handleEditTodoKeyPress,
      handleEditTodoFinished,
    } = this.props

    const filter = findKey(filters, f => f)

    return (
      <ul className="todo-list">
        {todos.map((todo, i) => {
          if (filter === 'active' && todo.completed) return false
          if (filter === 'completed' && !todo.completed) return false

          return (
            <Todo
              key={i}
              todo={todo}
              checked={todo.completed}
              handleToggleTodo={handleToggleTodo}
              handleEditTodoOnChange={handleEditTodoOnChange}
              handleEditTodoOnDoubleClick={handleEditTodoOnDoubleClick}
              labelText={todo.text}
              handleRemove={handleRemove}
              handleBlur={handleBlur}
              handleEditTodoKeyPress={handleEditTodoKeyPress}
              handleEditTodoFinished={handleEditTodoFinished}
            />
          )
        })}
      </ul>
    )
  }
}

export default VisibleTodoList
