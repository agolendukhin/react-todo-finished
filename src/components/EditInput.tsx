import React, {
  useState,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react'
import { connect } from 'react-redux'
import { Dispatch, Action, ActionCreator, bindActionCreators } from 'redux'
import { get } from 'lodash'
import { Todo, RootState } from '../Types'
import { todosActions } from '../store/todos'

const { updateTodo } = todosActions

interface Props {
  todo: Todo
  updateTodo: ActionCreator<Action>
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

export default connect(
  ({ todos: { todos } }: RootState) => ({ todos }),
  (dispatch: Dispatch) => bindActionCreators({ updateTodo }, dispatch)
)(EditInputComponent)
