class Footer extends React.Component {
  render() {
    const {
      display,
      todosLeft,
      filters,
      filterTodos,
      clearCompleted,
    } = this.props

    if (!display) return null

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todosLeft}</strong>
          <span>{todosLeft === 1 ? ' item' : ' items'} left</span>
        </span>
        <Filters filters={filters} filterTodos={filterTodos} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer;
