import React, { Component } from 'react'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'

export default class Todo extends Component {
  liRef = React.createRef()

  render() {
    const {
      className,
      todo,
      handleToggleTodo,
      handleEditTodoOnDoubleClick,
      handleRemove,
      handleEditTodoOnChangeFinished,
    } = this.props

    return (
      <li className={className} ref={this.liRef}>
        <div className="view">
          <ToggleTodo todo={todo} handleToggleTodo={handleToggleTodo} />
          <label onDoubleClick={() => handleEditTodoOnDoubleClick(todo.id)}>
            {todo.text}
          </label>
          <button className="destroy" onClick={() => handleRemove(todo.id)} />
        </div>
        <EditInput
          liRef={this.liRef}
          todo={todo}
          handleEditTodoOnChangeFinished={handleEditTodoOnChangeFinished}
        />
      </li>
    )
  }
}
