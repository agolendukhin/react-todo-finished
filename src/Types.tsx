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

export interface TodosState {
  isFetching: boolean
  todos: Todos
}

export interface RootState {
  todos: TodosState
  filters: Filters
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

export type Action = TodoAction | TodosAction
