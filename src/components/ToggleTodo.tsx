import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateTodo } from '../store/actions'
import { Todo, TodoActionCreator, RootState, ConnectDispatch } from '../Types'

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

export default connect(
  ({ todos }: RootState) => ({ todos }),
  (dispatch: ConnectDispatch) =>
    bindActionCreators(
      {
        updateTodo,
      },
      dispatch
    )
)(ToggleTodoComponent)
