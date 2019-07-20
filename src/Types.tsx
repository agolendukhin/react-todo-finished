import { Action } from 'redux'

export type Todo = {
  id: number
  serverId: string
  userId: string
  text: string
  completed: boolean | undefined
}

export type Todos = Array<Todo>

export type Filters = {
  all: boolean
  active: boolean
  completed: boolean
}

export type Error = {
  id: string
  title: string
  message: string
}

export type Errors = {
  errors: Array<Error>
}

export interface TodosState {
  isFetching: boolean
  todos: Todos
}

export interface RootState {
  todos: TodosState
  filters: Filters
  errors: Errors
}

export interface TodoAction extends Action {
  payload: {
    todo: Todo
    userId: string
  }
}

export interface TodosAction extends Action {
  payload: {
    todos: Todos
    completed?: boolean | undefined
  }
}

export interface ErrorAction extends Action {
  payload: {
    error: Error
    errorId?: string
  }
}

export type AuthUser = {
  uid: string
}

export type Action = TodoAction | TodosAction
