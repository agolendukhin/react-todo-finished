import { createReducer } from 'redux-starter-kit'
import { Errors } from '../Types'
import { Errors as ErrorsEntities } from './entities'
import { todosActions } from './todos'

const REMOVE_ERROR = 'app/errors/REMOVE_ERROR'
const REMOVE_ERRORS = 'app/errors/REMOVE_ERRORS'

const initialState: Errors = {
  errors: [],
}

export default createReducer(initialState, {
  [todosActions.addTodoError.type]: ErrorsEntities.addError,
  [todosActions.removeTodoError.type]: ErrorsEntities.addError,
  [todosActions.updateTodoError.type]: ErrorsEntities.addError,
  [todosActions.toggleAllTodosError.type]: ErrorsEntities.addError,
  [todosActions.fetchTodosError.type]: ErrorsEntities.addError,
  [REMOVE_ERROR]: ErrorsEntities.removeError,
  [REMOVE_ERRORS]: ErrorsEntities.removeErrors,
})

export const removeError = (errorId: string) => ({
  type: REMOVE_ERROR,
  payload: {
    errorId,
  },
})

export const removeErrors = () => ({ type: REMOVE_ERRORS })
