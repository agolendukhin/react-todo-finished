import { AnyAction } from 'redux'

const TOGGLE_FILTER = 'app/filters/TOGGLE_FILTER'

interface IFiltersState {
  all: boolean
  active: boolean
  completed: boolean
}

const initialState: IFiltersState = {
  all: true,
  active: false,
  completed: false,
}

export default (state = initialState, action: AnyAction): IFiltersState => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        all: false,
        active: false,
        completed: false,
        [action.activatedFilter]: true,
      }

    default:
      return state
  }
}

export const toggleFilter = (activatedFilter: string) => ({
  type: TOGGLE_FILTER,
  activatedFilter,
})
