import { find } from 'lodash'
import {
  TodosState,
  TodosAction,
  TodoAction,
  Todo,
  Errors as TErrors,
  ErrorAction,
} from '../Types'

// https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html

export const Todos = {
  fetchTodosRequested: (state: TodosState) => {
    state.isFetching = false
  },
  fetchTodosSuccess: (state: TodosState, action: TodosAction) => {
    state.isFetching = false
    state.todos = action.payload.todos
  },
  addTodoLocal: (state: TodosState, action: TodoAction) => {
    state.todos.push(action.payload.todo)
  },
  addTodoServer: (state: TodosState, action: TodoAction) => {
    const newTodo = action.payload.todo
    let todo2update = find(state.todos, {
      id: newTodo.id,
    }) as Todo

    todo2update.serverId = newTodo.serverId
  },
  removeTodoLocal: (state: TodosState, action: TodoAction) => {
    state.todos = state.todos.filter(todo => todo.id !== action.payload.todo.id)
  },
  updateTodoLocal: (state: TodosState, action: TodoAction) => {
    const newTodo = action.payload.todo
    state.todos = state.todos.map(todo =>
      todo.id === newTodo.id ? newTodo : todo
    )
  },
  toggleAllTodosLocal: (state: TodosState, action: TodosAction) => {
    state.todos = state.todos.map(todo => ({
      ...todo,
      completed: action.payload.completed,
    }))
  },
  clearCompletedLocal: (state: TodosState) => {
    state.todos = state.todos.filter(t => !t.completed)
  },
}

export const Errors = {
  addError: (state: TErrors, action: ErrorAction) => {
    const {
      payload: { error },
    } = action

    state.errors.push(error)
  },
  removeError: (state: TErrors, action: ErrorAction) => {
    const {
      payload: { errorId },
    } = action

    state.errors = state.errors.filter(error => error.id !== errorId)
  },
  removeErrors: (state: TErrors) => {
    state.errors = []
  },
}
