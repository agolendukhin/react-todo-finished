import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { getNewId } from '../utils'
import { addTodo } from '../store/actions'
import { get } from 'lodash'
import { Todos, TodoActionCreator, RootState, ConnectDispatch } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todos: Todos
  addTodo: TodoActionCreator
}

const HeaderComponent: React.FC<Props> = props => {
  const { todos, addTodo } = props
  const [value, setValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = e =>
    setValue(get(e, ['target', 'value'], ''))

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && value) {
      addTodo({
        id: getNewId(todos),
        text: value,
        completed: false,
      })

      setValue('')
    }
  }

  return (
    <header>
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={value}
      />
    </header>
  )
}

export default compose(
  withFirebase,
  connect(
    ({ todos }: RootState) => ({ todos }),
    (dispatch: ConnectDispatch) =>
      bindActionCreators(
        {
          addTodo,
        },
        dispatch
      )
  )
)(HeaderComponent) as React.ComponentType
