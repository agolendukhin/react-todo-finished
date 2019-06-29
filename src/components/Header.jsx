import React, { useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getNewId } from '../utils'

import { addTodo } from '../store/actions'

import { get } from 'lodash'

const Header = props => {
  const { todos, addTodo } = props
  const [value, setValue] = useState('')

  const handleChange = e => setValue(get(e, ['target', 'value'], ''))

  const handleKeyPress = e => {
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

export default connect(
  ({ todos }) => ({ todos }),
  dispatch =>
    bindActionCreators(
      {
        addTodo,
      },
      dispatch
    )
)(Header)
