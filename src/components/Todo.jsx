import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classNames from 'classnames'

import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'

import { removeTodo } from '../store/actions'

class Todo extends Component {
  constructor(props) {
    super(props)
    const {
      todo: { completed },
    } = props

    this.state = {
      completed,
      className: getLiClassName({ completed }),
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      todo: { completed: nextCompleted },
    } = nextProps

    const prevCompleted = state.completed

    if (nextCompleted !== prevCompleted) {
      return {
        className: getLiClassName({ completed: nextCompleted }),
        completed: nextCompleted,
      }
    }

    return null
  }

  handleDoubleClick = () => {
    const { completed } = this.state
    this.setState({
      className: getLiClassName({ completed, editing: true }),
    })
  }

  resetLiClassName = () => {
    const { completed } = this.state
    this.setState({
      className: getLiClassName({ completed }),
    })
  }

  render() {
    const { className } = this.state
    const { todo, removeTodo } = this.props

    return (
      <li className={className}>
        <div className="view">
          <ToggleTodo todo={todo} />
          <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
          <button className="destroy" onClick={() => removeTodo(todo.id)} />
        </div>
        <EditInput todo={todo} resetLiClassName={this.resetLiClassName} />
      </li>
    )
  }
}

const getLiClassName = ({ completed, editing = false }) =>
  classNames({
    completed,
    editing,
  })

export default connect(
  ({ todos }) => ({ todos }),
  dispatch =>
    bindActionCreators(
      {
        removeTodo,
      },
      dispatch
    )
)(Todo)
