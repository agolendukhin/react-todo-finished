import React, { Component } from 'react'

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
      filters: {
        all: true,
        active: false,
        completed: false,
      },
    }
  }

  activeTodosCount = () => {
    const { todos } = this.state
    return todos.filter(t => !t.completed).length
  }

  addTodo = text => {
    const { todos } = this.state

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
    const { todos } = this.state
    const updatedTodos = todos.filter(t => t.id !== todoId)

    this.updateTodos(updatedTodos)
  }

  handleToggleTodo = todoId => {
    const { todos } = this.state

    const updatedTodos = todos.map(
      todo =>
        todo.id !== todoId ? todo : { ...todo, completed: !todo.completed }
    )

    this.updateTodos(updatedTodos)
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
    const { todos } = this.state
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
    const { todos } = this.state
    this.updateTodos(todos.filter(t => !t.completed))
  }

  handleEditTodoFinished = changedTodo => {
    const { todos } = this.state

    const updatedTodos = todos.map(
      todo => (todo.id !== changedTodo.id ? todo : changedTodo)
    )
    this.updateTodos(updatedTodos)
  }

  updateTodos = todos => {
    this.setState({
      todos,
    })
    updateTodosInLocalStorage(todos)
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
    const { todos, filters, editing, editingId } = this.state
    const activeTodosCount = this.activeTodosCount()
    const todosCount = todos.length
    const completedTodosCount = todosCount - activeTodosCount

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
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
            handleToggleTodo={this.handleToggleTodo}
            handleRemove={this.handleRemove}
            handleEditTodoFinished={this.handleEditTodoFinished}
            handleEditTodoOnDoubleClick={this.handleEditTodoOnDoubleClick}
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
