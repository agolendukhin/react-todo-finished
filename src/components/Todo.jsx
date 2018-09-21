import React, { Component } from 'react'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'

export default class Todo extends Component {
  render() {
    const {
      className,
      liRef,
      editInputRef,
      todo,
      handleToggleTodo,
      handleEditTodoOnDoubleClick,
      handleRemove,
      handleEditTodoOnChangeFinished,
      displayEditInput,
    } = this.props

    return (
      <li className={className} ref={liRef}>
        <div className="view">
          <ToggleTodo todo={todo} handleToggleTodo={handleToggleTodo} />
          <label onDoubleClick={() => handleEditTodoOnDoubleClick(todo.id)}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => handleRemove(todo.id)} />
        </div>
        <EditInput
          editInputRef={editInputRef}
          liRef={liRef}
          todo={todo}
          handleEditTodoOnChangeFinished={handleEditTodoOnChangeFinished}
          display={displayEditInput}
        />
      </li>
    )
  }
}
