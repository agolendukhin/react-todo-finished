import React, { Component } from "react";
import "./index.css";
import { get } from "lodash";
import {
  readTodosFromLocalStorage,
  updateTodosInLocalStorage
} from "./utils/local-storage";
import { getNewId } from "./utils/utils";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodoText: "",
      editing: false,
      editingId: null,
      filters: {
        all: true,
        active: false,
        completed: false
      }
    };

    this.editingEditInputRef = React.createRef();
    this.editingEditLiRef = React.createRef();
  }

  todosLeftCount = () => {
    return this.state.todos.filter(t => !t.completed).length;
  };

  addTodo = () => {
    const text = this.state.newTodoText;

    const todos = this.state.todos;

    const updatedTodos = [
      ...todos,
      {
        id: getNewId(todos),
        text,
        completed: false
      }
    ];

    this.updateTodos(updatedTodos);
  };

  handleRemove = todoId => {
    const todos = this.state.todos;

    const updatedTodos = todos.filter(t => t.id !== todoId);

    this.updateTodos(updatedTodos);
  };

  handleToggleTodo = todoId => {
    const todos = this.state.todos;
    let updatedTodos = [];

    todos.forEach(todo => {
      if (todo.id !== todoId) {
        updatedTodos.push(todo);
        return;
      }

      updatedTodos.push({
        ...todo,
        completed: !todo.completed
      });
    });

    this.updateTodos(updatedTodos);
  };

  handleEdit = (todoId, e) => {
    setTimeout(() => {
      this.editingEditInputRef.current.focus();
    }, 1);

    const todos = this.state.todos;
    let updatedTodos = [];
    todos.forEach(todo => {
      if (todo.id !== todoId) {
        updatedTodos.push(todo);
        return;
      }
      updatedTodos.push({
        ...todo
      });
    });

    this.setState({
      editing: true,
      editingId: todoId
    });
    this.updateTodos(updatedTodos);
  };

  handleNewTodoChange = e => {
    const newTodoText = get(e, ["target", "value"], "");

    this.setState({
      newTodoText
    });
  };

  handleNewTodoKeyPress = e => {
    if (e.key === "Enter") {
      this.addTodo();
      this.setState({
        newTodoText: ""
      });
    }
  };

  filterTodos = activatedFilterName => {
    let updatedFilters = {
      all: false,
      active: false,
      completed: false
    };

    updatedFilters[activatedFilterName] = true;

    this.setState({
      filters: updatedFilters
    });
  };

  handleToggleAllTodosClick = () => {
    let todos = this.state.todos;
    let updatedTodos = [];
    const todosLeft = this.todosLeftCount();
    if (todosLeft !== 0) {
      updatedTodos = todos.map(todo => ({ ...todo, completed: true }));
    } else {
      updatedTodos = todos.map(todo => ({ ...todo, completed: false }));
    }

    this.updateTodos(updatedTodos);
  };

  handleClearCompleted = () => {
    const todos = this.state.todos;
    this.updateTodos(todos.filter(t => !t.completed));
  };

  handleEdit = (todoId, e) => {
    const newText = get(e, "target.value", "");
    let updatedTodos = [];
    this.state.todos.forEach(todo => {
      if (todo.id === todoId) {
        updatedTodos.push({
          ...todo,
          text: newText
        });
        return;
      }
      updatedTodos.push(todo);
    });

    this.updateTodos(updatedTodos);
  };

  updateTodos = todos => {
    this.setState({
      todos
    });
    updateTodosInLocalStorage(todos);
  };

  handleBlur = completed => {
    this.editingEditLiRef.current.className = completed ? "completed" : "";
  };

  handleEditTodoKeyPress = e => {
    if (e.key === "Enter") {
      this.editingEditInputRef.current.blur();
    }
  };

  componentDidMount() {
    const todos = readTodosFromLocalStorage();
    const filter = window.location.hash.slice(2);

    this.setState(filter ? { todos, filter } : { todos });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const todosLeft = this.todosLeftCount();
    return (
      <section className="todoapp">
        <Header
          onChange={this.handleNewTodoChange}
          onKeyPress={this.handleNewTodoKeyPress}
          value={this.newTodoText}
        />
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
            onClick={this.handleToggleAllTodosClick}
            ref={this.toggleAllCheckboxRef}
            checked={!todosLeft}
            onChange={() => {}}
          />
          <TodoList
            onToggleTodo={() => this.handleToggleTodo(todo.id)}
            onEditTodo={e => this.handleEdit(todo.id, e)}
            onRemoveTodo={() => this.handleRemove(todo.id)}
            onChangeTodo={e => this.handleEdit(todo.id, e)}
            onBlurTodo={() => this.handleBlur(todo.completed)}
            onKeyPressTodo={this.handleEditTodoKeyPress}
          />
        </section>
        <Footer
          display={!!this.state.todos.length}
          todosLeft={todosLeft}
          filters={this.state.filters}
          filterTodos={this.filterTodos}
          clearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

class Filters extends React.Component {
  render() {
    const { filters, filterTodos } = this.props;

    return (
      <ul className="filters">
        {filters.entries(([filter, activated]) => {
          return (
            <li>
              <a
                href={"#/" + (filter === "all" ? "" : filter)}
                className={activated ? "selected" : ""}
                onClick={() => filterTodos(filter)}
              >
                {filter.charAt[0].toUpperCase() + filter.slice(1)}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

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
      onKeyPress
    } = this.props;
    return (
      <ul className="todo-list">
        {todos.map((todo, i) => {
          if (filter === "active" && todo.completed) return false;
          if (filter === "completed" && !todo.completed) return false;

          let completedLiClassName = todo.completed ? "completed" : "";
          let liRef = null;

          const displayEditInput = editing && editingId === todo.id;

          if (displayEditInput) {
            liRef = editingEditLiRef;
            completedLiClassName += " editing";
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
          );
        })}
      </ul>
    );
  }
}

class Todo extends React.Component {
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
      editingEditInputRef
    } = this.props;
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
    );
  }
}

class Footer extends React.Component {
  render() {
    const {
      display,
      todosLeft,
      filters,
      filterTodos,
      clearCompleted
    } = this.props;

    if (!display) return null;

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todosLeft}</strong>
          <span>{todosLeft === 1 ? " item" : " items"} left</span>
        </span>
        <Filters filters={filters} filterTodos={filterTodos} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.props.onChange}
          onKeyPress={this.props.onKeyPress}
          value={this.props.value}
        />
      </header>
    );
  }
}

class EditInput extends React.Component {
  render() {
    if (!this.props.display) {
      return <input className="edit" />;
    }
    return (
      <input
        className="edit"
        ref={this.props.ref}
        value={this.props.value}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        onKeyPress={this.props.onKeyPress}
      />
    );
  }
}

class ToggleTodo extends React.Component {
  render() {
    return (
      <input
        className="toggle"
        type="checkbox"
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    );
  }
}

export default App;
