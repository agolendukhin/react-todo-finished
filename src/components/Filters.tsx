import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch, ActionCreator, Action, bindActionCreators } from 'redux'
import { Filters, RootState } from '../Types'
import { toggleFilter } from '../store/filters'

interface Props {
  toggleFilter: ActionCreator<Action>
  filters: Filters
}

const FiltersComponent: React.FC<Props> = props => {
  const { filters, toggleFilter } = props

  useEffect(() => {
    const filter = window.location.hash.slice(2)

    if (filter) toggleFilter(filter)
  }, [toggleFilter])

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

export default connect(
  ({ filters }: RootState) => ({ filters }),
  (dispatch: Dispatch) => bindActionCreators({ toggleFilter }, dispatch)
)(FiltersComponent)
