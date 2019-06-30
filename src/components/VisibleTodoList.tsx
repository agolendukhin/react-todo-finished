import React from 'react'
import { connect } from 'react-redux'
import { findKey } from 'lodash'
import Todo from './Todo'
import { Todos, Filters, RootState } from '../Types'

interface ListProps {
  todos: Todos
  filters: Filters
}

const VisibleTodoList: React.FC<ListProps> = props => {
  const { todos, filters } = props
  const filter = findKey(filters, f => f)

  return (
    <ul className="todo-list">
      {todos.map((todo, i) => {
        if (filter === 'active' && todo.completed) return false
        if (filter === 'completed' && !todo.completed) return false

        return <Todo key={i} todo={todo} />
      })}
    </ul>
  )
}

export default connect(
  ({ todos, filters }: RootState) => ({ todos, filters }),
  null
)(VisibleTodoList)
