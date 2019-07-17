import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { TOGGLE_FILTER } from '../store/actions'
import { Filters, RootState } from '../Types'

interface Props {
  dispatch: Dispatch
  filters: Filters
}

const FiltersComponent: React.FC<Props> = props => {
  const { filters, dispatch } = props

  useEffect(() => {
    const filter = window.location.hash.slice(2)

    if (filter) dispatch({ type: TOGGLE_FILTER, activatedFilter: filter })
  }, [dispatch])

  return (
    <ul className="filters">
      {Object.entries(filters).map(([filter, activated], index) => {
        return (
          <li key={index}>
            <a
              href={'#/' + (filter === 'all' ? '' : filter)}
              className={activated ? 'selected' : ''}
              onClick={() =>
                dispatch({ type: TOGGLE_FILTER, activatedFilter: filter })
              }>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default connect(({ filters }: RootState) => ({ filters }))(
  FiltersComponent
)
