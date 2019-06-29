import React, { useState } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { get } from 'lodash'

import { updateTodo } from '../store/actions'

const EditInput = props => {
  const [value, setValue] = useState(get(props, 'todo.text', ''))

  const onChange = e => setValue(get(e, 'target.value', ''))

  const onBlur = () => {
    const { todo, updateTodo, resetLiClassName } = props

    updateTodo({
      ...todo,
      text: value,
    })

    resetLiClassName()
  }

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      const { resetLiClassName } = props
      resetLiClassName()
    }
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
