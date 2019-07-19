import { AnyAction } from 'redux'
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { createReducer } from 'redux-starter-kit'
import { find } from 'lodash'
import { Todos, Todo } from '../Types'
import { api } from '../components/firebase'
import { createTodoAction } from '../utils'

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

export default createReducer(initialState, {
  [fetchTodos.requested.type]: state => {
    state.isFetching = false
  },
  [fetchTodos.success.type]: (state, action) => {
    state.isFetching = false
    state.todos = action.payload.todos
  },
  [addTodo.local.type]: (state, action) => {
    state.todos.push(action.payload.todo)
  },
  [addTodo.server.type]: (state, action) => {
    const newTodo = action.payload.todo
    let todo2update = find(state.todos, {
      id: newTodo.id,
    }) as Todo

    todo2update.serverId = newTodo.serverId
  },
  [removeTodo.local.type]: (state, action) => {
    state.todos = state.todos.filter(todo => todo.id !== action.payload.todo.id)
  },
  [updateTodo.local.type]: (state, action) => {
    const newTodo = action.payload.todo
    state.todos = state.todos.map(todo =>
      todo.id === newTodo.id ? newTodo : todo
    )
  },
  [toggleAllTodos.local.type]: (state, action) => {
    state.todos = state.todos.map(todo => ({
      ...todo,
      completed: action.payload.completed,
    }))
  },
  [clearCompleted.local.type]: state => {
    state.todos = state.todos.filter(t => !t.completed)
  },
})

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
