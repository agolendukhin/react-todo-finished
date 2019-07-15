import firebase from 'firebase'
import {
  Todo,
  TodoActionCreator,
  TodoDispatch,
  TodoGetState,
  TDB,
} from '../Types'

import { api } from '../components/firebase'

export const FETCH_TODOS = 'FETCH_TODOS'
export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const ADD_TODO_LOCAL = 'ADD_TODO_LOCAL'
export const ADD_TODO_SERVER = 'ADD_TODO_SERVER'
export const REMOVE_TODO_LOCAL = 'REMOVE_TODO_LOCAL'
export const REMOVE_TODO_SERVER = 'REMOVE_TODO_SERVER'
export const UPDATE_TODO_LOCAL = 'UPDATE_TODO_LOCAL'
export const UPDATE_TODO_SERVER = 'UPDATE_TODO_SERVER'
export const TOGGLE_ALL_TODOS_LOCAL = 'TOGGLE_ALL_LOCAL'
export const TOGGLE_ALL_TODOS_SERVER = 'TOGGLE_ALL_SERVER'
export const CLEAR_COMPLETED_LOCAL = 'CLEAR_COMPLETED_LOCAL'
export const CLEAR_COMPLETED_SERVER = 'CLEAR_COMPLETED_SERVER'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const getTodos: TodoActionCreator = () => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: SET_IS_FETCHING, isFetching: true })

  api
    .fetchTodos()
    .then(todos => {
      dispatch({ type: FETCH_TODOS, todos })
      dispatch({ type: SET_IS_FETCHING, isFetching: false })
    })
    .catch(error => {
      console.log({ error })
    })
}

export const addTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: ADD_TODO_LOCAL, todo: { ...todo, serverId: '' } })

  api
    .addTodo(todo)
    .then(({ id: serverId }: firebase.firestore.DocumentReference) => {
      dispatch({ type: ADD_TODO_SERVER, todo: { ...todo, serverId } })
    })
    .catch(error => {
      console.log({ error })
    })
}

export const removeTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: REMOVE_TODO_LOCAL, id: todo.id })

  api
    .removeTodo(todo.serverId)
    .then(() => {
      dispatch({
        type: REMOVE_TODO_SERVER,
        id: todo.id,
        serverId: todo.serverId,
      })
    })
    .catch(error => {
      console.log({ error })
    })
}

export const updateTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: UPDATE_TODO_LOCAL, todo })

  api
    .updateTodo(todo)
    .then(() => dispatch({ type: UPDATE_TODO_SERVER, todo }))
    .catch(error => {
      console.log({ error })
    })
}

export const toggleAllTodos: TodoActionCreator = (completed: boolean) => async (
  dispatch: TodoDispatch,
  getState: TodoGetState
) => {
  const { todos } = getState()

  dispatch({ type: TOGGLE_ALL_TODOS_LOCAL, completed })

  api
    .toggleAllTodos(todos, completed)
    .then(() => dispatch({ type: TOGGLE_ALL_TODOS_SERVER }))
    .catch(error => {
      console.log({ error })
    })
}

export const clearCompleted: TodoActionCreator = () => async (
  dispatch: TodoDispatch,
  getState: TodoGetState
) => {
  const { todos } = getState()

  dispatch({ type: CLEAR_COMPLETED_LOCAL })

  api
    .clearCompleted(todos)
    .then(() => dispatch({ type: CLEAR_COMPLETED_SERVER }))
    .catch(error => {
      console.log({ error })
    })
}

export const toggleFilter: TodoActionCreator = (
  activatedFilter: string
) => async (dispatch: TodoDispatch) => {
  dispatch({ type: TOGGLE_FILTER, activatedFilter })
}
