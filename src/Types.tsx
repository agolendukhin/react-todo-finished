import { Action, ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import firebase from 'firebase'

export type Todo = {
  id: number
  serverId: string
  userId: string
  text: string
  completed: boolean
}

export type Todos = Array<Todo>

export type Filters = {
  all: boolean
  active: boolean
  completed: boolean
}

export type Scope = {
  isFetching: boolean
}

export type RootState = {
  todos: Array<Todo>
  filters: Filters
  scope: Scope
}

export type TodoActionCreator = ActionCreator<
  ThunkAction<void, RootState, {}, Action>
>

export type TodoDispatch = ThunkDispatch<RootState, {}, Action>

export type TodoGetState = () => RootState

export type ConnectDispatch = ThunkDispatch<{}, {}, any>

export type TDB = firebase.firestore.Firestore
