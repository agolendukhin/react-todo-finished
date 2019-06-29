import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { toggleFilter } from '../store/actions'

class Filters extends Component {
  componentDidMount() {
    const filter = window.location.hash.slice(2)

    if (filter) this.props.toggleFilter(filter)
  }

  render() {
    const { filters, toggleFilter } = this.props

    return (
      <ul className="filters">
        {Object.entries(filters).map(([filter, activated], index) => {
          return (
            <li key={index}>
              <a
                href={'#/' + (filter === 'all' ? '' : filter)}
                className={activated ? 'selected' : ''}
                onClick={() => toggleFilter(filter)}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default connect(
  ({ filters }) => ({ filters }),
  dispatch =>
    bindActionCreators(
      {
        toggleFilter,
      },
      dispatch
    )
)(Filters)
