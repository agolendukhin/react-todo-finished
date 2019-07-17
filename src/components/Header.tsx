import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { getNewId } from '../utils'
import { ADD_TODO_LOCAL } from '../store/actions'
import { get } from 'lodash'
import { Todos, RootState } from '../Types'
import { withFirebase } from './firebase'

interface Props {
  todos: Todos
  dispatch: Dispatch
}

const HeaderComponent: React.FC<Props> = props => {
  const { todos, dispatch } = props
  const [value, setValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = e =>
    setValue(get(e, ['target', 'value'], ''))

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && value) {
      dispatch({
        type: ADD_TODO_LOCAL,
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
  connect(({ todos }: RootState) => ({ todos }))
)(HeaderComponent) as React.ComponentType
