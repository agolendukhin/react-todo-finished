import { createReducer } from 'redux-starter-kit'

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
export default createReducer(initialState, {
  [TOGGLE_FILTER]: (state, action) => {
    return {
      all: false,
      active: false,
      completed: false,
      [action.activatedFilter]: true,
    }
  },
})

// export default (state = initialState, action: AnyAction): IFiltersState => {
//   switch (action.type) {
//     case TOGGLE_FILTER:
//       return {
//         all: false,
//         active: false,
//         completed: false,
//         [action.activatedFilter]: true,
//       }

//     default:
//       return state
//   }
// }

export const toggleFilter = (activatedFilter: string) => ({
  type: TOGGLE_FILTER,
  activatedFilter,
})
