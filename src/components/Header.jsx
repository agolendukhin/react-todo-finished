class Header extends React.Component {
  render() {
    const { onChange, onKeyPress, value } = this.props
    return (
      <header>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={value}
        />
      </header>
    )
  }
}

export default Header
