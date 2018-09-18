class Filters extends React.Component {
  render() {
    const { filters, filterTodos } = this.props

    return (
      <ul className="filters">
        {filters.entries(([filter, activated]) => {
          return (
            <li>
              <a
                href={'#/' + (filter === 'all' ? '' : filter)}
                className={activated ? 'selected' : ''}
                onClick={() => filterTodos(filter)}>
                {filter.charAt[0].toUpperCase() + filter.slice(1)}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Filters
