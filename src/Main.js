import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { pick } from 'lodash'

import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'

import { getNewId } from './utils/utils'

import Header from './components/Header'
import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'

import {
  addTodo,
  removeTodo,
  updateTodo,
  toggleAllTodos,
  clearCompleted,
  toggleFilter,
} from './actions'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = pick(props, ['todos', 'filters'])
  }

  addTodo = text => {
    const { todos } = this.state

    this.props.addTodo({
      id: getNewId(todos),
      text,
      completed: false,
    })
  }

  activeTodosCount = () => {
    const { todos } = this.state
    return todos.filter(t => !t.completed).length
  }

  handleToggleAllTodos = () => {
    const { toggleAllTodos } = this.props

    const activeTodosCount = this.activeTodosCount()

    const completed = activeTodosCount ? true : false
    toggleAllTodos(completed)
  }

  static getDerivedStateFromProps(props) {
    return {
      todos: props.todos,
      filters: props.filters,
    }
  }

  componentDidMount() {
    const filter = window.location.hash.slice(2)

    if (filter) this.props.toggleFilter(filter)
  }

  render() {
    const { todos, filters, editing, editingId } = this.state
    const activeTodosCount = this.activeTodosCount()
    const todosCount = todos.length
    const completedTodosCount = todosCount - activeTodosCount

    const { updateTodo, removeTodo, clearCompleted, toggleFilter } = this.props

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          {todos.length ? (
            <React.Fragment>
              <input
                className="toggle-all"
                type="checkbox"
                checked={!activeTodosCount}
                onChange={() => {}}
              />
              <label onClick={this.handleToggleAllTodos} htmlFor="toggle-all" />
            </React.Fragment>
          ) : null}
          <VisibleTodoList
            todos={todos}
            filters={filters}
            editing={editing}
            editingId={editingId}
            handleToggleTodo={todo =>
              updateTodo({ ...todo, completed: !todo.completed })
            }
            handleRemove={id => removeTodo(id)}
            handleEditTodoFinished={todo => updateTodo(todo)}
            handleEditTodoOnDoubleClick={this.handleEditTodoOnDoubleClick}
          />
        </section>
        <Footer
          display={!!todos.length}
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
          filters={filters}
          handleFilters={activeFilter => toggleFilter(activeFilter)}
          handleClearCompleted={clearCompleted}
        />
      </section>
    )
  }
}

export default connect(
  ({ todos, filters }) => ({ todos, filters }),
  dispatch =>
    bindActionCreators(
      {
        addTodo,
        removeTodo,
        updateTodo,
        toggleAllTodos,
        clearCompleted,
        toggleFilter,
      },
      dispatch
    )
)(Main)
