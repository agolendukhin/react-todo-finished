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

export type TodoGetState = () => RootState

export type TDB = firebase.firestore.Firestore
