import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  ActionCreator,
  Action,
  bindActionCreators,
} from 'redux'
import classNames from 'classnames'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'
import { Todo, RootState } from '../Types'
import { withFirebase } from './firebase'
import { todosActions } from '../store/todos'

const { removeTodo } = todosActions

interface Props {
  todo: Todo
  removeTodo: ActionCreator<Action>
}

const TodoComponent: React.FC<Props> = props => {
  const initialCompleted = get(props, 'todo.completed')

  const { todo, removeTodo } = props

  const [completed, setCompleted] = useState(initialCompleted)
  const [className, setClassName] = useState(
    getLiClassName({ completed: initialCompleted })
  )

  useEffect(() => {
    const nextCompleted = props.todo.completed

    setCompleted(nextCompleted)
    setClassName(getLiClassName({ completed: !!nextCompleted }))
  }, [props.todo.completed])

  const handleDoubleClick = () =>
    setClassName(getLiClassName({ completed, editing: true }))

  const resetLiClassName = () => setClassName(getLiClassName({ completed }))

  return (
    <li className={className}>
      <div className="view">
        <ToggleTodo todo={todo} />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={() => removeTodo({ todo })} />
      </div>
      <EditInput todo={todo} resetLiClassName={resetLiClassName} />
    </li>
  )
}

interface ClassNamesProps {
  completed: boolean
  editing?: boolean
}

const getLiClassName = ({ completed, editing = false }: ClassNamesProps) =>
  classNames({
    completed,
    editing,
  })

export default compose(
  withFirebase,
  connect(
    ({ todos: { todos } }: RootState) => ({ todos }),
    (dispatch: Dispatch) => bindActionCreators({ removeTodo }, dispatch)
  )
)(TodoComponent) as any
