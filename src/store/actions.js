export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'

export const TOGGLE_FILTER = 'TOGGLE_FILTER'

export const addTodo = todo => async dispatch => {
  dispatch({ type: ADD_TODO, todo })
}

export const removeTodo = id => async dispatch => {
  dispatch({ type: REMOVE_TODO, id })
}

export const updateTodo = todo => async dispatch => {
  dispatch({ type: UPDATE_TODO, todo })
}

export const toggleAllTodos = completed => async dispatch => {
  dispatch({ type: TOGGLE_ALL_TODOS, completed })
}

export const clearCompleted = () => async dispatch => {
  dispatch({ type: CLEAR_COMPLETED })
}

export const toggleFilter = activatedFilter => async dispatch => {
  dispatch({ type: TOGGLE_FILTER, activatedFilter })
}
