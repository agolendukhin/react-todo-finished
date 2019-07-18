import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  ActionCreator,
  Action,
  bindActionCreators,
} from 'redux'
import { getNewId } from '../utils'
import { get } from 'lodash'
import { Todos, RootState } from '../Types'
import { withFirebase } from './firebase'
import { todosActions } from '../store/todos'

const { addTodo } = todosActions

interface Props {
  todos: Todos
  addTodo: ActionCreator<Action>
}

const HeaderComponent: React.FC<Props> = props => {
  const { todos, addTodo } = props
  const [value, setValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = e =>
    setValue(get(e, ['target', 'value'], ''))

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && value) {
      addTodo({
        todo: {
          id: getNewId(todos),
          text: value,
          completed: false,
          serverId: '',
        },
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
    ({ todos: { todos } }: RootState) => ({ todos }),
    (dispatch: Dispatch) => bindActionCreators({ addTodo }, dispatch)
  )
)(HeaderComponent) as React.ComponentType
