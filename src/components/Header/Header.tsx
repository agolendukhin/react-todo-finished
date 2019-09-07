import React, {
  useState,
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  ActionCreator,
  Action,
  bindActionCreators,
} from 'redux'
import styled from 'styled-components'
import { getNewId } from '../../utils'
import { get } from 'lodash'
import { Todos, RootState } from '../../Types'
import { todosActions } from '../../store/todos'
import { withFirebase } from '../../firebase/context'

const { addTodo } = todosActions

interface Props {
  todos: Todos
  addTodo: ActionCreator<Action>
  firebase: {
    user: firebase.User
  }
}

const HeaderComponent: React.FC<Props> = props => {
  const {
    todos,
    firebase: { user },
  } = props
  const [value, setValue] = useState('')

  const addTodo = () => {
    props.addTodo({
      todo: {
        id: getNewId(todos),
        text: value,
        completed: false,
        serverId: '',
      },
      userId: user.uid,
    })

    setValue('')
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e =>
    setValue(get(e, ['target', 'value'], ''))

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && value) {
      addTodo()
    }
  }

  const handleOnPlusClick: MouseEventHandler<HTMLLabelElement> = e => {
    value && addTodo()
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
      <div>
        <PlusButton onClick={handleOnPlusClick}>+</PlusButton>
      </div>
    </header>
  )
}

const PlusButton = styled.label`
  margin-top: -20px;
  position: absolute;
  right: 27px;
  top: 42px;
  font-size: 22px;
  color: #bbbbbb;
`

export default compose(
  withFirebase,
  connect(
    ({ todos: { todos } }: RootState) => ({ todos }),
    (dispatch: Dispatch) => bindActionCreators({ addTodo }, dispatch)
  )
)(HeaderComponent) as any
