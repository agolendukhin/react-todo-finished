import ToggleTodo from './ToggleTodo'
import EditInput from './EditInput'

export default class Todo extends React.Component {
  render() {
    const {
      className,
      liRef,
      todo,
      onToggle,
      onEdit,
      onRemove,
      onChange,
      onBlur,
      onKeyPress,
      display,
      editingEditInputRef,
    } = this.props
    return (
      <li className={className} ref={liRef}>
        <div className="view">
          <ToggleTodo checked={todo.completed} onChange={onToggle} />
          <label onDoubleClick={onEdit}>{todo.text}</label>
          <button className="destroy" onClick={onRemove} />
        </div>
        <EditInput
          ref={editingEditInputRef}
          value={todo.text}
          onChange={onChange}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          display={display}
        />
      </li>
    )
  }
}
