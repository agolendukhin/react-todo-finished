import React, { Component } from 'react'

class ToggleTodo extends Component {
  render() {
    return (
      <input
        className="toggle"
        type="checkbox"
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    )
  }
}

export default ToggleTodo
