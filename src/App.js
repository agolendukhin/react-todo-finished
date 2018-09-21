import React, { Component } from 'react'
import { get } from 'lodash'

import './index.css'

import {
  readTodosFromLocalStorage,
  updateTodosInLocalStorage,
} from './utils/local-storage'
import { getNewId } from './utils/utils'

import Header from './components/Header'
import VisibleTodoList from './components/VisibleTodoList'
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

  handleEditTodoOnDoubleClick = todoId => {
    this.setState({
      editing: true,
      editingId: todoId,
    })
  }

  handleNewTodoChange = e => {
    const newTodoText = get(e, ['target', 'value'], '')
    this.setState({
      newTodoText,
    })
  }

  handleNewTodoKeyPress = e => {
    if (e.key === 'Enter' && this.state.newTodoText) {
      this.addTodo()
      this.setState({ newTodoText: '' })
    }
  }

  handleFilters = activatedFilterName => {
    this.setState({
      filters: {
        all: false,
        active: false,
        completed: false,
        [activatedFilterName]: true,
      },
    })
  }

  handleToggleAllTodos = () => {
    const todos = this.state.todos
    const activeTodosCount = this.activeTodosCount()
    let updatedTodos = []
    if (activeTodosCount !== 0) {
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

  handleEditTodoOnChange = (todoId, e) => {
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
    this.setState({
      todos,
    })
    if (filter) this.handleFilters(filter)
  }

  render() {
    const { newTodoText, todos, filters, editing, editingId } = this.state
    const activeTodosCount = this.activeTodosCount()
    const todosCount = todos.length
    const completedTodosCount = todosCount - activeTodosCount
    return (
      <section className="todoapp">
        <Header
          handleNewTodoChange={this.handleNewTodoChange}
          handleNewTodoKeyPress={this.handleNewTodoKeyPress}
          newTodoText={newTodoText}
        />
        <section className="main">
          {todos.length ? (
            <input
              className="toggle-all"
              type="checkbox"
              onClick={this.handleToggleAllTodos}
              checked={!activeTodosCount}
              onChange={() => {}}
            />
          ) : null}
          <VisibleTodoList
            todos={todos}
            filters={filters}
            editing={editing}
            editingId={editingId}
            editingEditLiRef={this.editingEditLiRef}
            handleToggleTodo={this.handleToggleTodo}
            handleEditTodoOnDoubleClick={this.handleEditTodoOnDoubleClick}
            handleEditTodoOnChange={this.handleEditTodoOnChange}
            handleRemove={this.handleRemove}
            handleBlur={this.handleBlur}
            handleEditTodoKeyPress={this.handleEditTodoKeyPress}
          />
        </section>
        <Footer
          display={!!todos.length}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          filters={this.state.filters}
          handleFilters={this.handleFilters}
          handleClearCompleted={this.handleClearCompleted}
        />
      </section>
    )
  }
}

export default App
