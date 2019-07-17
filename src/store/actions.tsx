import firebase from 'firebase'
import { Todo, TodoActionCreator, TodoDispatch, TodoGetState } from '../Types'

import { api } from '../components/firebase'

export const FETCH_TODOS_REQUESTED = 'FETCH_TODOS_REQUESTED'
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
export const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR'

export const SET_IS_FETCHING = 'SET_IS_FETCHING'

export const ADD_TODO_LOCAL = 'ADD_TODO_LOCAL'
export const ADD_TODO_SERVER = 'ADD_TODO_SERVER'
export const ADD_TODO_SERVER_ERROR = 'ADD_TODO_SERVER_ERROR'

export const REMOVE_TODO_LOCAL = 'REMOVE_TODO_LOCAL'
export const REMOVE_TODO_SERVER = 'REMOVE_TODO_SERVER'
export const REMOVE_TODO_SERVER_ERROR = 'REMOVE_TODO_SERVER_ERROR'

export const UPDATE_TODO_LOCAL = 'UPDATE_TODO_LOCAL'
export const UPDATE_TODO_SERVER = 'UPDATE_TODO_SERVER'
export const UPDATE_TODO_SERVER_ERROR = 'UPDATE_TODO_SERVER_ERROR'

export const TOGGLE_ALL_TODOS_LOCAL = 'TOGGLE_ALL_LOCAL'
export const TOGGLE_ALL_TODOS_SERVER = 'TOGGLE_ALL_SERVER'
export const TOGGLE_ALL_TODOS_SERVER_ERROR = 'TOGGLE_ALL_TODOS_SERVER_ERROR'

export const CLEAR_COMPLETED_LOCAL = 'CLEAR_COMPLETED_LOCAL'
export const CLEAR_COMPLETED_SERVER = 'CLEAR_COMPLETED_SERVER'
export const CLEAR_COMPLETED_SERVER_ERROR = 'CLEAR_COMPLETED_SERVER_ERROR'

export const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const getTodos: TodoActionCreator = () => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: SET_IS_FETCHING, isFetching: true })
  dispatch({ type: FETCH_TODOS_REQUESTED })
}

export const addTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: ADD_TODO_LOCAL, todo: { ...todo, serverId: '' } })
}

export const removeTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: REMOVE_TODO_LOCAL, todo })
}

export const updateTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: UPDATE_TODO_LOCAL, todo })
}

export const toggleAllTodos: TodoActionCreator = (completed: boolean) => async (
  dispatch: TodoDispatch,
  getState: TodoGetState
) => {
  const { todos } = getState()

  dispatch({ type: TOGGLE_ALL_TODOS_LOCAL, todos, completed })
}

export const clearCompleted: TodoActionCreator = () => async (
  dispatch: TodoDispatch,
  getState: TodoGetState
) => {
  const { todos } = getState()

  dispatch({ type: CLEAR_COMPLETED_LOCAL, todos })
}

export const toggleFilter: TodoActionCreator = (
  activatedFilter: string
) => async (dispatch: TodoDispatch) => {
  dispatch({ type: TOGGLE_FILTER, activatedFilter })
}
