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

    this.liRef = React.createRef()
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

  handleBlur = () => {
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
      <li className={className} ref={this.liRef}>
        <div className="view">
          <ToggleTodo todo={todo} handleToggleTodo={handleToggleTodo} />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => handleRemove(todo.id)} />
        </div>
        <EditInput
          liRef={this.liRef}
          todo={todo}
          handleEditTodoFinished={handleEditTodoFinished}
          handleBlur={this.handleBlur}
        />
      </li>
    )
  }
}
