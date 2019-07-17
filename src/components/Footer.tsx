import React from 'react'
import { connect } from 'react-redux'
import Filters from './Filters'
import ClearCompletedButton from './ClearCompleted'
import { Todos, RootState } from '../Types'

interface Props {
  todos: Todos
  activeTodosCount: number
  completedTodosCount: number
}

const FooterComponent: React.FC<Props> = props => {
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

export default connect(({ todos: { todos }, filters }: RootState) => ({
  todos,
  filters,
}))(FooterComponent)
