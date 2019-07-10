import { combineReducers, AnyAction } from 'redux'
import { get } from 'lodash'
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  TOGGLE_ALL_TODOS,
  CLEAR_COMPLETED,
  TOGGLE_FILTER,
} from './actions'
import { Todo, Filters } from '../Types'

const todosReducer = (todos: Array<Todo> = [], action: AnyAction) => {
  switch (action.type) {
    case ADD_TODO:
      return [...todos, action.todo]

    case REMOVE_TODO:
      return todos.filter(todo => todo.id !== action.id)

    case UPDATE_TODO:
      return todos.map(todo =>
        todo.id === get(action, 'todo.id') ? action.todo : todo
      )

    case TOGGLE_ALL_TODOS:
      return todos.map(todo => ({ ...todo, completed: action.completed }))

    case CLEAR_COMPLETED:
      return todos.filter(t => !t.completed)

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

export default combineReducers({ todos: todosReducer, filters: filtersReducer })
