import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { updateTodo } from '../store/actions'
import { Todo, TodoActionCreator, RootState, ConnectDispatch } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todo: Todo
  updateTodo: TodoActionCreator
}

const ToggleTodoComponent: React.FC<Props> = props => {
  const { todo, updateTodo } = props

  return (
    <input
      className="toggle"
      type="checkbox"
      checked={todo.completed}
      onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
    />
  )
}

export default compose(
  withFirebase,
  connect(
    ({ todos }: RootState) => ({ todos }),
    (dispatch: ConnectDispatch) =>
      bindActionCreators(
        {
          updateTodo,
        },
        dispatch
      )
  )
)(ToggleTodoComponent) as any
