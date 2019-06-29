import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Filters from './Filters'
import ClearCompletedButton from './ClearCompleted'

import { toggleFilter, clearCompleted } from '../store/actions'

class Footer extends Component {
  render() {
    const { todos, activeTodosCount, completedTodosCount } = this.props

    const display = !!todos.length

    if (!display) return null

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodosCount}</strong>
          <span>{activeTodosCount === 1 ? ' item' : ' items'} left</span>
        </span>
        <Filters />
        <ClearCompletedButton display={completedTodosCount} />
      </footer>
    )
  }
}

export default connect(
  ({ todos, filters }) => ({ todos, filters }),
  dispatch =>
    bindActionCreators(
      {
        toggleFilter,
        clearCompleted,
      },
      dispatch
    )
)(Footer)
