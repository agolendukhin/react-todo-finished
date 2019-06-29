import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getNewId } from '../utils'

import { addTodo } from '../store/actions'

import { get } from 'lodash'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleChange = e => {
    const value = get(e, ['target', 'value'], '')
    this.setState({
      value,
    })
  }

  handleKeyPress = e => {
    const { value } = this.state
    const { todos, addTodo } = this.props

    if (e.key === 'Enter' && value) {
      addTodo({
        id: getNewId(todos),
        text: value,
        completed: false,
      })

      this.setState({ value: '' })
    }
  }

  render() {
    const { value } = this.state
    return (
      <header>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={value}
        />
      </header>
    )
  }
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
