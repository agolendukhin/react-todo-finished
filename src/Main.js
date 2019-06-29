import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'

import { getNewId } from './utils'

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
} from './store/actions'

class Main extends Component {
  addTodo = text => {
    const { todos } = this.props

    this.props.addTodo({
      id: getNewId(todos),
      text,
      completed: false,
    })
  }

  activeTodosCount = () => {
    const { todos } = this.props
    return todos.filter(t => !t.completed).length
  }

  handleToggleAllTodos = () => {
    const { toggleAllTodos } = this.props

    const activeTodosCount = this.activeTodosCount()

    const completed = activeTodosCount ? true : false
    toggleAllTodos(completed)
  }

  render() {
    const { todos } = this.props

    const activeTodosCount = this.activeTodosCount()
    const todosCount = todos.length
    const completedTodosCount = todosCount - activeTodosCount

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
          <VisibleTodoList />
        </section>
        <Footer
          activeTodosCount={activeTodosCount}
          completedTodosCount={completedTodosCount}
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
