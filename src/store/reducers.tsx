import { combineReducers, AnyAction } from 'redux'
import { get } from 'lodash'
import {
  FETCH_TODOS_SUCCESS,
  ADD_TODO_SERVER,
  ADD_TODO_LOCAL,
  REMOVE_TODO_LOCAL,
  REMOVE_TODO_SERVER,
  UPDATE_TODO_LOCAL,
  UPDATE_TODO_SERVER,
  TOGGLE_ALL_TODOS_LOCAL,
  TOGGLE_ALL_TODOS_SERVER,
  CLEAR_COMPLETED_LOCAL,
  CLEAR_COMPLETED_SERVER,
  TOGGLE_FILTER,
  SET_IS_FETCHING,
} from './actions'
import { Todo, Filters } from '../Types'

const todosReducer = (todos: Array<Todo> = [], action: AnyAction) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return action.todos

    case ADD_TODO_LOCAL:
      return [...todos, action.todo]

    case ADD_TODO_SERVER:
      return todos.map(todo =>
        todo.id === action.todo.id ? action.todo : todo
      )

    case REMOVE_TODO_LOCAL:
      return todos.filter(todo => todo.id !== action.todo.id)

    case UPDATE_TODO_LOCAL:
      return todos.map(todo =>
        todo.id === get(action, 'todo.id') ? action.todo : todo
      )

    case TOGGLE_ALL_TODOS_LOCAL:
      return todos.map(todo => ({ ...todo, completed: action.completed }))

    case CLEAR_COMPLETED_LOCAL:
      return todos.filter(t => !t.completed)

    case TOGGLE_ALL_TODOS_SERVER:
    case CLEAR_COMPLETED_SERVER:
    case REMOVE_TODO_SERVER:
    case UPDATE_TODO_SERVER:
    default:
      return todos
  }
}

const filtersReducer = (
  filters: Filters = {
    all: true,
    active: false,
    completed: false,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return {
        all: false,
        active: false,
        completed: false,
        [action.activatedFilter]: true,
      }

    default:
      return filters
  }
}

const scopeReducer = (scope = { isFetching: false }, action: AnyAction) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return { ...scope, isFetching: action.isFetching }

    default:
      return scope
  }
}

export default combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
  scope: scopeReducer,
})
