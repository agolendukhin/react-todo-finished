import React, {
  useState,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react'

import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { get } from 'lodash'
import { UPDATE_TODO_LOCAL } from '../store/actions'

import { Todo, RootState } from '../Types'

import { withFirebase } from './firebase'

interface Props {
  todo: Todo
  dispatch: Dispatch
  resetLiClassName: () => void
}

const EditInputComponent: React.FC<Props> = props => {
  const { todo, dispatch, resetLiClassName } = props
  const [value, setValue] = useState(get(props, 'todo.text', ''))

  const onChange: ChangeEventHandler<HTMLInputElement> = e =>
    setValue(get(e, 'target.value', ''))

  const onKeyPress: KeyboardEventHandler<HTMLInputElement> = e =>
    e.key === 'Enter' && resetLiClassName()

  const onBlur: FocusEventHandler<HTMLInputElement> = () => {
    dispatch({
      type: UPDATE_TODO_LOCAL,
      todo: {
        ...todo,
        text: value,
      },
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
  connect(({ todos: { todos } }: RootState) => ({ todos }))
)(EditInputComponent) as any
