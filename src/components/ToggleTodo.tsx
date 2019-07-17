import React from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { UPDATE_TODO_LOCAL } from '../store/actions'
import { Todo, RootState } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todo: Todo
  dispatch: Dispatch
}

const ToggleTodoComponent: React.FC<Props> = props => {
  const { todo, dispatch } = props

  return (
    <input
      className="toggle"
      type="checkbox"
      checked={todo.completed}
      onChange={() =>
        dispatch({
          type: UPDATE_TODO_LOCAL,
          todo: { ...todo, completed: !todo.completed },
        })
      }
    />
  )
}

export default compose(
  withFirebase,
  connect(({ todos: { todos } }: RootState) => ({ todos }))
)(ToggleTodoComponent) as any
