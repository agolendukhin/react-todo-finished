import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Filters from './Filters'
import ClearCompletedButton from './ClearCompleted'
import { toggleFilter, clearCompleted } from '../store/actions'
import { Todos, RootState, ConnectDispatch } from '../Types'

interface FooterProps {
  todos: Todos
  activeTodosCount: number
  completedTodosCount: number
}

const FooterComponent: React.FC<FooterProps> = props => {
  const { todos, activeTodosCount, completedTodosCount } = props

  const display = !!todos.length

  if (!display) return null

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodosCount}</strong>
        <span>{activeTodosCount === 1 ? ' item' : ' items'} left</span>
      </span>
      <Filters />
      <ClearCompletedButton display={!!completedTodosCount} />
    </footer>
  )
}

export default connect(
  ({ todos, filters }: RootState) => ({ todos, filters }),
  (dispatch: ConnectDispatch) =>
    bindActionCreators(
      {
        toggleFilter,
        clearCompleted,
      },
      dispatch
    )
)(FooterComponent)
