import { AnyAction } from 'redux'
import { get } from 'lodash'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { Todos, Todo } from '../Types'
import { api } from '../components/firebase'

const FETCH_TODOS_REQUESTED = 'FETCH_TODOS_REQUESTED'
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
const FETCH_TODOS_ERROR = 'FETCH_TODOS_ERROR'

const ADD_TODO_LOCAL = 'ADD_TODO_LOCAL'
const ADD_TODO_SERVER = 'ADD_TODO_SERVER'
const ADD_TODO_SERVER_ERROR = 'ADD_TODO_SERVER_ERROR'

const REMOVE_TODO_LOCAL = 'REMOVE_TODO_LOCAL'
const REMOVE_TODO_SERVER = 'REMOVE_TODO_SERVER'
const REMOVE_TODO_SERVER_ERROR = 'REMOVE_TODO_SERVER_ERROR'

const UPDATE_TODO_LOCAL = 'UPDATE_TODO_LOCAL'
const UPDATE_TODO_SERVER = 'UPDATE_TODO_SERVER'
const UPDATE_TODO_SERVER_ERROR = 'UPDATE_TODO_SERVER_ERROR'

const TOGGLE_ALL_TODOS_LOCAL = 'TOGGLE_ALL_TODOS_LOCAL'
const TOGGLE_ALL_TODOS_SERVER = 'TOGGLE_ALL_TODOS_SERVER'
const TOGGLE_ALL_TODOS_SERVER_ERROR = 'TOGGLE_ALL_TODOS_SERVER_ERROR'

const CLEAR_COMPLETED_LOCAL = 'CLEAR_COMPLETED_LOCAL'
const CLEAR_COMPLETED_SERVER = 'CLEAR_COMPLETED_SERVER'
const CLEAR_COMPLETED_SERVER_ERROR = 'CLEAR_COMPLETED_SERVER_ERROR'

interface ITodosState {
  isFetching: boolean
  todos: Todos
}

const initialState: ITodosState = {
  isFetching: false,
  todos: [],
}

export default (state = initialState, action: AnyAction): ITodosState => {
  switch (action.type) {
    case FETCH_TODOS_REQUESTED:
      return { ...state, isFetching: true }

    case FETCH_TODOS_SUCCESS:
      return { ...state, todos: action.todos, isFetching: false }

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

    case TOGGLE_ALL_TODOS_SERVER:
    case CLEAR_COMPLETED_SERVER:
    case REMOVE_TODO_SERVER:
    case UPDATE_TODO_SERVER:
    default:
      return state
  }
}

export const fetchTodos = () => ({
  type: FETCH_TODOS_REQUESTED,
})

export const addTodo = (todo: Todo) => ({ type: ADD_TODO_LOCAL, todo })

export const removeTodo = (todo: Todo) => ({ type: REMOVE_TODO_LOCAL, todo })

export const updateTodo = (todo: Todo) => ({ type: UPDATE_TODO_LOCAL, todo })

export const toggleAllTodos = (todos: Todos, completed: boolean) => ({
  type: TOGGLE_ALL_TODOS_LOCAL,
  todos,
  completed,
})

export const clearCompleted = (todos: Todos) => ({
  type: CLEAR_COMPLETED_LOCAL,
  todos,
})

export const sagas = [
  {
    action: FETCH_TODOS_REQUESTED,
    effect: takeLatest,
    *saga() {
      try {
        const todos = yield call(api.fetchTodos)

        yield put({ type: FETCH_TODOS_SUCCESS, todos, isFetching: false })
      } catch (error) {
        yield put({ type: FETCH_TODOS_ERROR, error })
      }
    },
  },
  {
    action: ADD_TODO_LOCAL,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const { todo } = action
      try {
        const { id: serverId } = yield call(api.addTodo, todo)

        yield put({ type: ADD_TODO_SERVER, todo: { ...todo, serverId } })
      } catch (error) {
        yield put({ type: ADD_TODO_SERVER_ERROR, error })
      }
    },
  },
  {
    action: REMOVE_TODO_LOCAL,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const { todo } = action
      try {
        yield call(api.removeTodo, todo.serverId)

        yield put({ type: REMOVE_TODO_SERVER })
      } catch (error) {
        yield put({ type: REMOVE_TODO_SERVER_ERROR, error })
      }
    },
  },
  {
    action: UPDATE_TODO_LOCAL,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const { todo } = action
      try {
        yield call(api.updateTodo, todo)

        yield put({ type: UPDATE_TODO_SERVER })
      } catch (error) {
        yield put({ type: UPDATE_TODO_SERVER_ERROR, error })
      }
    },
  },
  {
    action: TOGGLE_ALL_TODOS_LOCAL,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const { todos, completed } = action
      try {
        yield call(api.toggleAllTodos, todos, completed)

        yield put({ type: TOGGLE_ALL_TODOS_SERVER })
      } catch (error) {
        yield put({ type: TOGGLE_ALL_TODOS_SERVER_ERROR, error })
      }
    },
  },
  {
    action: CLEAR_COMPLETED_LOCAL,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const { todos } = action
      try {
        yield call(api.clearCompleted, todos)

        yield put({ type: CLEAR_COMPLETED_SERVER })
      } catch (error) {
        yield put({ type: CLEAR_COMPLETED_SERVER_ERROR, error })
      }
    },
  },
]
