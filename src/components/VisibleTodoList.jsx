import findKey from 'lodash/findKey'
import React, { Component } from 'react'
import Todo from './Todo'

class VisibleTodoList extends Component {
  render() {
    const {
      todos,
      filters,
      editing,
      editingId,
      handleToggleTodo,
      handleEditTodoOnChange,
      handleEditTodoOnDoubleClick,
      handleRemove,
      handleBlur,
      handleEditTodoKeyPress,
      handleEditTodoOnChangeFinished,
    } = this.props

    const filter = findKey(filters, f => f)

    return (
      <ul className="todo-list">
        {todos.map((todo, i) => {
          if (filter === 'active' && todo.completed) return false
          if (filter === 'completed' && !todo.completed) return false

          let completedLiClassName = todo.completed ? 'completed' : ''

          const displayEditInput = editing && editingId === todo.id

          if (displayEditInput) {
            completedLiClassName += ' editing'
          }

          return (
            <Todo
              key={i}
              todo={todo}
              className={completedLiClassName}
              checked={todo.completed}
              handleToggleTodo={handleToggleTodo}
              handleEditTodoOnChange={handleEditTodoOnChange}
              handleEditTodoOnDoubleClick={handleEditTodoOnDoubleClick}
              labelText={todo.text}
              handleRemove={handleRemove}
              handleBlur={handleBlur}
              handleEditTodoKeyPress={handleEditTodoKeyPress}
              displayEditInput={displayEditInput}
              handleEditTodoOnChangeFinished={handleEditTodoOnChangeFinished}
            />
          )
        })}
      </ul>
    )
  }
}

export default VisibleTodoList
