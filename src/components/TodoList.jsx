import Todo from './Todo'
class TodoList extends React.Component {
  render() {
    const {
      todos,
      filter,
      editing,
      editingId,
      editingEditLiRef,
      editingEditInputRef,
      onToggleTodo,
      onEditTodo,
      onRemoveTodo,
      onChange,
      onBlur,
      onKeyPress,
    } = this.props
    return (
      <ul className="todo-list">
        {todos.map((todo, i) => {
          if (filter === 'active' && todo.completed) return false
          if (filter === 'completed' && !todo.completed) return false

          let completedLiClassName = todo.completed ? 'completed' : ''
          let liRef = null

          const displayEditInput = editing && editingId === todo.id

          if (displayEditInput) {
            liRef = editingEditLiRef
            completedLiClassName += ' editing'
          }
          return (
            <Todo
              key={i}
              className={completedLiClassName}
              liRef={liRef}
              checked={todo.completed}
              onToggleTodo={onToggleTodo}
              onEditTodo={onEditTodo}
              labelText={todo.text}
              onRemoveTodo={onRemoveTodo}
              editingEditInputRef={editingEditInputRef}
              onChange={onChange}
              onBlur={onBlur}
              onKeyPress={onKeyPress}
              displayEditInput={displayEditInput}
            />
          )
        })}
      </ul>
    )
  }
}

export default TodoList
