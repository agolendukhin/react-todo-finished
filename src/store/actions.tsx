import { Todo, TodoActionCreator, TodoDispatch } from '../Types'

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const addTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: ADD_TODO, todo })
}

export const removeTodo: TodoActionCreator = (id: number) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: REMOVE_TODO, id })
}

export const updateTodo: TodoActionCreator = (todo: Todo) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: UPDATE_TODO, todo })
}

export const toggleAllTodos: TodoActionCreator = (completed: boolean) => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: TOGGLE_ALL_TODOS, completed })
}

export const clearCompleted: TodoActionCreator = () => async (
  dispatch: TodoDispatch
) => {
  dispatch({ type: CLEAR_COMPLETED })
}

export const toggleFilter: TodoActionCreator = (
  activatedFilter: string
) => async (dispatch: TodoDispatch) => {
  dispatch({ type: TOGGLE_FILTER, activatedFilter })
}
