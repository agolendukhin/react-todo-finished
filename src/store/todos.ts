import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { createReducer } from 'redux-starter-kit'
import { Todos, TodoAction, TodosAction } from '../Types'
import { api } from '../components/firebase'
import { createAppAction, createError } from '../utils'
import { Todos as TodosEntities } from './entities'

const addTodo = createAppAction('add todo', 'todos')
const removeTodo = createAppAction('remove todo', 'todos')
const updateTodo = createAppAction('update todo', 'todos')
const toggleAllTodos = createAppAction('toggle all todos', 'todos')
const clearCompleted = createAppAction('clear completed', 'todos')
const fetchTodos = createAppAction('fetch todos', 'todos', [
  'requested',
  'success',
  'error',
])

export const todosActions = {
  addTodo: addTodo.local,
  addTodoError: addTodo.error,
  removeTodo: removeTodo.local,
  removeTodoError: removeTodo.error,
  updateTodo: updateTodo.local,
  updateTodoError: updateTodo.error,
  toggleAllTodos: toggleAllTodos.local,
  toggleAllTodosError: toggleAllTodos.error,
  clearCompleted: clearCompleted.local,
  clearCompletedError: clearCompleted.error,
  fetchTodos: fetchTodos.requested,
  fetchTodosError: fetchTodos.error,
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
  [fetchTodos.requested.type]: TodosEntities.fetchTodosRequested,
  [fetchTodos.success.type]: TodosEntities.fetchTodosSuccess,
  [addTodo.local.type]: TodosEntities.addTodoLocal,
  [addTodo.server.type]: TodosEntities.addTodoServer,
  [removeTodo.local.type]: TodosEntities.removeTodoLocal,
  [updateTodo.local.type]: TodosEntities.updateTodoLocal,
  [toggleAllTodos.local.type]: TodosEntities.toggleAllTodosLocal,
  [clearCompleted.local.type]: TodosEntities.clearCompletedLocal,
})

export const sagas = [
  {
    action: fetchTodos.requested,
    effect: takeLatest,
    *saga(action: TodoAction) {
      const {
        payload: { userId },
      } = action
      try {
        const todos = yield call(api.fetchTodos, userId)

        yield put(fetchTodos.success({ todos }))
      } catch (error) {
        yield put(
          fetchTodos.error({
            error: createError({
              title: fetchTodos.error.type,
              message: error.toString(),
            }),
          })
        )
      }
    },
  },
  {
    action: addTodo.local,
    effect: takeEvery,
    *saga(action: TodoAction) {
      const {
        payload: { todo, userId },
      } = action
      try {
        const { id: serverId } = yield call(api.addTodo, todo, userId)

        yield put(addTodo.server({ todo: { ...todo, serverId } }))
      } catch (error) {
        yield put(
          addTodo.error({
            error: createError({
              title: addTodo.error.type,
              message: error.toString(),
            }),
          })
        )
      }
    },
  },
  {
    action: removeTodo.local,
    effect: takeEvery,
    *saga(action: TodoAction) {
      const {
        payload: { todo },
      } = action
      try {
        yield call(api.removeTodo, todo.serverId)

        yield put(removeTodo.server())
      } catch (error) {
        yield put(
          removeTodo.error({
            error: createError({
              title: removeTodo.error.type,
              message: error.toString(),
            }),
          })
        )
      }
    },
  },
  {
    action: updateTodo.local,
    effect: takeEvery,
    *saga(action: TodoAction) {
      const {
        payload: { todo },
      } = action
      try {
        yield call(api.updateTodo, todo)

        yield put(updateTodo.server())
      } catch (error) {
        yield put(
          updateTodo.error({
            error: createError({
              title: updateTodo.error.type,
              message: error.toString(),
            }),
          })
        )
      }
    },
  },
  {
    action: toggleAllTodos.local,
    effect: takeEvery,
    *saga(action: TodosAction) {
      const {
        payload: { todos, completed },
      } = action
      try {
        yield call(api.toggleAllTodos, todos, completed)

        yield put(toggleAllTodos.server())
      } catch (error) {
        yield put(
          toggleAllTodos.error({
            error: createError({
              title: toggleAllTodos.error.type,
              message: error.toString(),
            }),
          })
        )
      }
    },
  },
  {
    action: clearCompleted.local,
    effect: takeEvery,
    *saga(action: TodosAction) {
      const {
        payload: { todos },
      } = action
      try {
        yield call(api.clearCompleted, todos)

        yield put(clearCompleted.server())
      } catch (error) {
        yield put(
          clearCompleted.error({
            error: createError({
              title: clearCompleted.error.type,
              message: error.toString(),
            }),
          })
        )
      }
    },
  },
]
