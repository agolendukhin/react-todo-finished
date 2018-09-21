import React, { Component } from 'react'
import get from 'lodash/get'

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
    const { addTodo } = this.props

    if (e.key === 'Enter' && value) {
      addTodo(value)
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

export default Header
