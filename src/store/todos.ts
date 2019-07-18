import { AnyAction } from 'redux'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { Todos } from '../Types'
import { api } from '../components/firebase'
import { createReducer, createAction } from 'redux-starter-kit'

const createTodoAction = (name: string, keys?: Array<string>) => {
  name = name.replace(/\s/g, '_')
  return (keys || ['local', 'server', 'error'])
    .map(postfix => ({
      [postfix]: createAction(
        'app/todos/' + `${name}_${postfix}`.toUpperCase()
      ),
    }))
    .reduce((acc, curr) => {
      const postfix = Object.keys(curr)[0]
      const name = Object.values(curr)[0]
      acc[postfix] = name
      return acc
    }, {})
}

const addTodo = createTodoAction('add todo')
const removeTodo = createTodoAction('remove todo')
const updateTodo = createTodoAction('update todo')
const toggleAllTodos = createTodoAction('toggle all todos')
const clearCompleted = createTodoAction('clear completed')

const fetchTodos = createTodoAction('fetch todos', [
  'requested',
  'success',
  'error',
])

export const todosActions = {
  addTodo: addTodo.local,
  removeTodo: removeTodo.local,
  updateTodo: updateTodo.local,
  toggleAllTodos: toggleAllTodos.local,
  clearCompleted: clearCompleted.local,
  fetchTodos: fetchTodos.requested,
}

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
    case fetchTodos.requested.toString():
      return { ...state, isFetching: true }

    case fetchTodos.success.toString():
      return { ...state, todos: action.payload.todos, isFetching: false }

    case addTodo.local.toString():
      return { ...state, todos: [...state.todos, action.payload.todo] }

    case addTodo.server.toString():
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo
        ),
      }

    case removeTodo.local.toString():
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.todo.id),
      }

    case updateTodo.local.toString():
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo
        ),
      }

    case toggleAllTodos.local.toString():
      return {
        ...state,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.payload.completed,
        })),
      }

    case clearCompleted.local.toString():
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed),
      }

    default:
      return state
  }
}

export const sagas = [
  {
    action: fetchTodos.requested,
    effect: takeLatest,
    *saga() {
      try {
        const todos = yield call(api.fetchTodos)

        yield put(fetchTodos.success({ todos }))
      } catch (error) {
        yield put(fetchTodos.error({ error }))
      }
    },
  },
  {
    action: addTodo.local,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const {
        payload: { todo },
      } = action
      try {
        const { id: serverId } = yield call(api.addTodo, todo)

        yield put(addTodo.server({ todo: { ...todo, serverId } }))
      } catch (error) {
        yield put(addTodo.error({ error }))
      }
    },
  },
  {
    action: removeTodo.local,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const {
        payload: { todo },
      } = action
      try {
        yield call(api.removeTodo, todo.serverId)

        yield put(removeTodo.server())
      } catch (error) {
        yield put(removeTodo.error({ error }))
      }
    },
  },
  {
    action: updateTodo.local,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const {
        payload: { todo },
      } = action
      try {
        yield call(api.updateTodo, todo)

        yield put(updateTodo.server())
      } catch (error) {
        yield put(updateTodo.error({ error }))
      }
    },
  },
  {
    action: toggleAllTodos.local,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const {
        payload: { todos, completed },
      } = action
      try {
        yield call(api.toggleAllTodos, todos, completed)

        yield put(toggleAllTodos.server())
      } catch (error) {
        yield put(toggleAllTodos.error({ error }))
      }
    },
  },
  {
    action: clearCompleted.local,
    effect: takeEvery,
    *saga(action: AnyAction) {
      const {
        payload: { todos },
      } = action
      try {
        yield call(api.clearCompleted, todos)

        yield put(clearCompleted.server())
      } catch (error) {
        yield put(clearCompleted.error({ error }))
      }
    },
  },
]
