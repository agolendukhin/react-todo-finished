import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'

import Header from './components/Header'
import VisibleTodoList from './components/VisibleTodoList'
import Footer from './components/Footer'

import { toggleAllTodos } from './store/actions'

const Main = props => {
  const { todos, activeTodosCount, toggleAllTodos } = props

  const handleToggleAllTodos = () => {
    const completed = activeTodosCount ? true : false
    toggleAllTodos(completed)
  }

  const todosCount = todos.length
  const completedTodosCount = todosCount - activeTodosCount

  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        {todos.length ? (
          <React.Fragment>
            <input
              className="toggle-all"
              type="checkbox"
              checked={!activeTodosCount}
              onChange={() => {}}
            />
            <label onClick={handleToggleAllTodos} htmlFor="toggle-all" />
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

export default connect(
  ({ todos, filters }) => {
    const activeTodosCount = todos.filter(t => !t.completed).length

    return { activeTodosCount, todos, filters }
  },
  dispatch =>
    bindActionCreators(
      {
        toggleAllTodos,
      },
      dispatch
    )
)(Main)
