import React, { useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { get } from 'lodash'

import { updateTodo } from '../store/actions'

const EditInput = props => {
  const { todo, updateTodo, resetLiClassName } = props

  const [value, setValue] = useState(get(props, 'todo.text', ''))

  const onChange = e => setValue(get(e, 'target.value', ''))

  const onKeyPress = e => e.key === 'Enter' && resetLiClassName()

  const onBlur = () => {
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

export default connect(
  ({ todos }) => ({ todos }),
  dispatch =>
    bindActionCreators(
      {
        updateTodo,
      },
      dispatch
    )
)(EditInput)
