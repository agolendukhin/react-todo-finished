export const readTodosFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}

export const updateTodosInLocalStorage = todos => {
  localStorage.setItem('todos', JSON.stringify(todos))
}
