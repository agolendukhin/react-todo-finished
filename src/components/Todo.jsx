import React, { Component } from 'react'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'

export default class Todo extends Component {
  render() {
    const {
      className,
      liRef,
      todo,
      handleToggleTodo,
      handleEditTodoOnChange,
      handleEditTodoOnDoubleClick,
      handleRemove,
      handleBlur,
      handleEditTodoKeyPress,
      display,
      editingEditInputRef,
    } = this.props

    const { id, text, completed } = todo

    return (
      <li className={className} ref={liRef}>
        <div className="view">
          <ToggleTodo
            checked={completed}
            onChange={() => handleToggleTodo(id)}
          />
          <label onDoubleClick={() => handleEditTodoOnDoubleClick(id)}>
            {text}
          </label>
          <button className="destroy" onClick={() => handleRemove(id)} />
        </div>
        <EditInput
          editingEditInputRef={editingEditInputRef}
          todo={todo}
          handleEditTodoOnChange={handleEditTodoOnChange}
          handleBlur={handleBlur}
          handleEditTodoKeyPress={handleEditTodoKeyPress}
          display={display}
        />
      </li>
    )
  }
}
