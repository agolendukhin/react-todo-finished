import React, { Component } from 'react'
import { get } from 'lodash'

import './index.css'

import {
  readTodosFromLocalStorage,
  updateTodosInLocalStorage,
} from './utils/local-storage'
import { getNewId } from './utils/utils'

import Header from './components/Header'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      newTodoText: '',
      editing: false,
      editingId: null,
      filters: {
        all: true,
        active: false,
        completed: false,
      },
    }

    this.editingEditInputRef = React.createRef()
    this.editingEditLiRef = React.createRef()
  }

  activeTodosCount = () => {
    return this.state.todos.filter(t => !t.completed).length
  }

  addTodo = () => {
    const text = this.state.newTodoText
    const todos = this.state.todos

    const updatedTodos = [
      ...todos,
      {
        id: getNewId(todos),
        text,
        completed: false,
      },
    ]

    this.updateTodos(updatedTodos)
  }

  handleRemove = todoId => {
    const todos = this.state.todos
    const updatedTodos = todos.filter(t => t.id !== todoId)
    this.updateTodos(updatedTodos)
  }

  handleToggleTodo = todoId => {
    const todos = this.state.todos
    let updatedTodos = []

    todos.forEach(todo => {
      if (todo.id !== todoId) {
        updatedTodos.push(todo)
        return
      }

      updatedTodos.push({
        ...todo,
        completed: !todo.completed,
      })
    })

    this.updateTodos(updatedTodos)
  }

  handleEdit = (todoId, e) => {
    setTimeout(() => {
      this.editingEditInputRef.current.focus()
    }, 1)

    const todos = this.state.todos
    let updatedTodos = []
    todos.forEach(todo => {
      if (todo.id !== todoId) {
        updatedTodos.push(todo)
        return
      }
      updatedTodos.push({
        ...todo,
      })
    })

    this.setState({
      editing: true,
      editingId: todoId,
    })
    this.updateTodos(updatedTodos)
  }

  handleNewTodoChange = e => {
    const newTodoText = get(e, ['target', 'value'], '')
    this.setState({
      newTodoText,
    })
  }

  handleNewTodoKeyPress = e => {
    if (e.key === 'Enter') {
      this.addTodo()
      this.setState({
        newTodoText: '',
      })
    }
  }

  filterTodos = activatedFilterName => {
    let updatedFilters = {
      all: false,
      active: false,
      completed: false,
    }

    updatedFilters[activatedFilterName] = true

    this.setState({
      filters: updatedFilters,
    })
  }

  handleToggleAllTodos = () => {
    const todos = this.state.todos
    const todosLeft = this.activeTodosCount()
    let updatedTodos = []
    if (todosLeft !== 0) {
      updatedTodos = todos.map(todo => ({ ...todo, completed: true }))
    } else {
      updatedTodos = todos.map(todo => ({ ...todo, completed: false }))
    }

    this.updateTodos(updatedTodos)
  }

  handleClearCompleted = () => {
    const todos = this.state.todos
    this.updateTodos(todos.filter(t => !t.completed))
  }

  handleEdit = (todoId, e) => {
    const newText = get(e, 'target.value', '')
    let updatedTodos = []
    this.state.todos.forEach(todo => {
      if (todo.id !== todoId) {
        updatedTodos.push(todo)
      } else {
        updatedTodos.push({
          ...todo,
          text: newText,
        })
      }
    })

    this.updateTodos(updatedTodos)
  }

  updateTodos = todos => {
    this.setState({
      todos,
    })
    updateTodosInLocalStorage(todos)
  }

  handleBlur = completed => {
    this.editingEditLiRef.current.className = completed ? 'completed' : ''
  }

  handleEditTodoKeyPress = e => {
    if (e.key === 'Enter') {
      this.editingEditInputRef.current.blur()
    }
  }

  componentDidMount() {
    const todos = readTodosFromLocalStorage()
    const filter = window.location.hash.slice(2)
    this.setState(filter ? { todos, filter } : { todos })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const todosLeft = this.activeTodosCount()
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
            onClick={this.handleToggleAllTodos}
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
    )
  }
}

export default App
