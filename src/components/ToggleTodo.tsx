import React from 'react'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  Action,
  ActionCreator,
  bindActionCreators,
} from 'redux'
import { Todo, RootState } from '../Types'
import { withFirebase } from './firebase'
import { todosActions } from '../store/todos'

const { updateTodo } = todosActions

interface Props {
  todo: Todo
  updateTodo: ActionCreator<Action>
}

const ToggleTodoComponent: React.FC<Props> = props => {
  const { todo, updateTodo } = props

  return (
    <input
      className="toggle"
      type="checkbox"
      checked={todo.completed}
      onChange={() =>
        updateTodo({ todo: { ...todo, completed: !todo.completed } })
      }
    />
  )
}

export default compose(
  withFirebase,
  connect(
    ({ todos: { todos } }: RootState) => ({ todos }),
    (dispatch: Dispatch) => bindActionCreators({ updateTodo }, dispatch)
  )
)(ToggleTodoComponent) as any
