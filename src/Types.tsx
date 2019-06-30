import { Action, ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

export type Todo = {
  id: number
  text: string
  completed: boolean
}

export type Todos = Array<Todo>

export type Filters = {
  all: boolean
  active: boolean
  completed: boolean
}

export type RootState = {
  todos: Array<Todo>
  filters: Filters
}

export type TodoActionCreator = ActionCreator<
  ThunkAction<void, RootState, {}, Action>
>

export type TodoDispatch = ThunkDispatch<RootState, {}, Action>

export type ConnectDispatch = ThunkDispatch<{}, {}, any>
