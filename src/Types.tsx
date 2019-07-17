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

export type RootState = {
  todos: {
    isFetching: boolean
    todos: Todos
  }
  filters: Filters
}
