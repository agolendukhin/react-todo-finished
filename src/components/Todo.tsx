import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import classNames from 'classnames'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'
import { REMOVE_TODO_LOCAL } from '../store/actions'
import { Todo, RootState } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todo: Todo
  dispatch: Dispatch
}

const TodoComponent: React.FC<Props> = props => {
  const initialCompleted = get(props, 'todo.completed')

  const { todo, dispatch } = props

  const [completed, setCompleted] = useState(initialCompleted)
  const [className, setClassName] = useState(
    getLiClassName({ completed: initialCompleted })
  )

  useEffect(() => {
    const nextCompleted = props.todo.completed

    setCompleted(nextCompleted)
    setClassName(getLiClassName({ completed: nextCompleted }))
  }, [props.todo.completed])

  const handleDoubleClick = () =>
    setClassName(getLiClassName({ completed, editing: true }))

  const resetLiClassName = () => setClassName(getLiClassName({ completed }))

  return (
    <li className={className}>
      <div className="view">
        <ToggleTodo todo={todo} />
        <label onDoubleClick={handleDoubleClick}>{todo.text}</label>
        <button
          className="destroy"
          onClick={() => dispatch({ type: REMOVE_TODO_LOCAL, todo })}
        />
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
  connect(({ todos }: RootState) => ({ todos }))
)(TodoComponent) as any
