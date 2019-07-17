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

import { Todos, Filters } from '../Types'

const defaultState = {
  isFetching: false,
  todos: [],
}

interface IDefaultState {
  isFetching: boolean
  todos: Todos
}

const todosReducer = (
  state: IDefaultState = defaultState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.todos }

    case ADD_TODO_LOCAL:
      return { ...state, todos: [...state.todos, action.todo] }

    case ADD_TODO_SERVER:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      }

    case REMOVE_TODO_LOCAL:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      }

    case UPDATE_TODO_LOCAL:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === get(action, 'todo.id') ? action.todo : todo
        ),
      }

    case TOGGLE_ALL_TODOS_LOCAL:
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.completed,
        })),
      }

    case CLEAR_COMPLETED_LOCAL:
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed),
      }

    case SET_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }

    case TOGGLE_ALL_TODOS_SERVER:
    case CLEAR_COMPLETED_SERVER:
    case REMOVE_TODO_SERVER:
    case UPDATE_TODO_SERVER:
    default:
      return state
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

export default combineReducers({
  todos: todosReducer,
  filters: filtersReducer,
})
