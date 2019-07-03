import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classNames from 'classnames'
import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'
import { removeTodo } from '../store/actions'
import { Todo, TodoActionCreator, RootState, ConnectDispatch } from '../Types'

interface Props {
  todo: Todo
  removeTodo: TodoActionCreator
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
        <button className="destroy" onClick={() => removeTodo(todo.id)} />
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

export default connect(
  ({ todos }: RootState) => ({ todos }),
  (dispatch: ConnectDispatch) =>
    bindActionCreators(
      {
        removeTodo,
      },
      dispatch
    )
)(TodoComponent)
