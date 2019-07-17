import React, {
  useState,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { get } from 'lodash'
import { updateTodo } from '../store/actions'

import { Todo, RootState, TodoActionCreator, ConnectDispatch } from '../Types'

import { withFirebase } from './firebase'

interface Props {
  todo: Todo
  updateTodo: TodoActionCreator
  resetLiClassName: () => void
}

const EditInputComponent: React.FC<Props> = props => {
  const { todo, updateTodo, resetLiClassName } = props
  const [value, setValue] = useState(get(props, 'todo.text', ''))

  const onChange: ChangeEventHandler<HTMLInputElement> = e =>
    setValue(get(e, 'target.value', ''))

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = e =>
    e.key === 'Enter' && resetLiClassName()

  const onBlur: FocusEventHandler<HTMLInputElement> = () => {
    updateTodo({
      ...todo,
      text: value,
    })

    resetLiClassName()
  }

  return (
    <input
      className="edit"
      ref={input => input && input.focus()}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
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
)(EditInputComponent) as any
