import React, { Component } from 'react'

class Filters extends Component {
  render() {
    const { filters, handleFilters } = this.props

    return (
      <ul className="filters">
        {Object.entries(filters).map(([filter, activated], index) => {
          return (
            <li key={index}>
              <a
                href={'#/' + (filter === 'all' ? '' : filter)}
                className={activated ? 'selected' : ''}
                onClick={() => handleFilters(filter)}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Filters
