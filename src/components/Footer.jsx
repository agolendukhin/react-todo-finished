import React, { Component } from 'react'
import Filters from './Filters'

class Footer extends Component {
  render() {
    const {
      display,
      activeTodosCount,
      completedTodosCount,
      filters,
      handleFilters,
      handleClearCompleted,
    } = this.props

    if (!display) return null

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeTodosCount}</strong>
          <span>{activeTodosCount === 1 ? ' item' : ' items'} left</span>
        </span>
        <Filters filters={filters} handleFilters={handleFilters} />
        <ClearCompletedButton
          display={completedTodosCount}
          handleClearCompleted={handleClearCompleted}
        />
      </footer>
    )
  }
}

class ClearCompletedButton extends Component {
  render() {
    const { display, handleClearCompleted } = this.props

    if (!display) return null

    return (
      <button className="clear-completed" onClick={handleClearCompleted}>
        Clear completed
      </button>
    )
  }
}

export default Footer
