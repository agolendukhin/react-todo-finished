import React, { Component } from 'react'
import classNames from 'classnames'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'

export default class Todo extends Component {
  constructor(props) {
    super(props)
    const {
      todo: { completed },
    } = props

    this.state = {
      completed,
      className: classNames({
        completed,
      }),
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      todo: { completed: nextCompleted },
    } = nextProps
    const prevCompleted = state.completed

    if (nextCompleted !== prevCompleted) {
      return {
        className: classNames({
          completed: nextCompleted,
        }),
        completed: nextCompleted,
      }
    }

    return null
  }

  handleDoubleClick = () => {
    const { completed } = this.state
    this.setState({
      className: classNames({
        editing: true,
        completed,
      }),
    })
  }

  resetLiClassName = () => {
    const { completed } = this.state
    this.setState({
      className: classNames({
        completed,
      }),
    })
  }

  render() {
    const { className } = this.state
    const {
      todo,
      handleToggleTodo,
      handleRemove,
      handleEditTodoFinished,
    } = this.props

    return (
      <li className={className}>
        <div className="view">
          <ToggleTodo todo={todo} handleToggleTodo={handleToggleTodo} />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => handleRemove(todo.id)} />
        </div>
        <EditInput
          todo={todo}
          handleEditTodoFinished={handleEditTodoFinished}
          resetLiClassName={this.resetLiClassName}
        />
      </li>
    )
  }
}
