import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { updateTodo } from '../store/actions'
import {
  Todo,
  TodoActionCreator,
  RootState,
  ConnectDispatch,
  TDB,
} from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todo: Todo
  updateTodo: TodoActionCreator
  firebase: {
    db: TDB
  }
}

const ToggleTodoComponent: React.FC<Props> = props => {
  const {
    todo,
    updateTodo,
    firebase: { db },
  } = props

  return (
    <input
      className="toggle"
      type="checkbox"
      checked={todo.completed}
      onChange={() => updateTodo(db, { ...todo, completed: !todo.completed })}
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
