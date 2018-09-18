class ToggleTodo extends React.Component {
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
