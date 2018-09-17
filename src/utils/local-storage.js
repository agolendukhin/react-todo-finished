export const readTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const updateTasksInLocalStorage = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
