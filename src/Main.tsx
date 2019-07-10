import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'

import { Header, VisibleTodoList, Footer, SignOut } from './components'

import { toggleAllTodos } from './store/actions'
import { Todos, TodoActionCreator, RootState, ConnectDispatch } from './Types'
import { withFirebase } from './components/firebase'
import firebase from 'firebase'

interface Ifirebase extends firebase.app.App {
  signOut: () => void
}

interface MainProps {
  todos: Todos
  activeTodosCount: number
  toggleAllTodos: TodoActionCreator
  firebase: Ifirebase
}

const Main: React.FC<MainProps> = props => {
  const { todos, activeTodosCount, toggleAllTodos, firebase } = props

  const handleToggleAllTodos = () => {
    const completed = activeTodosCount ? true : false
    toggleAllTodos(completed)
  }

  const todosCount = todos.length
  const completedTodosCount = todosCount - activeTodosCount

  return (
    <React.Fragment>
      <SignOut onClick={() => firebase.signOut()}>Sign Out</SignOut>
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
    </React.Fragment>
  )
}

export default compose(
  withFirebase,
  connect(
    ({ todos, filters }: RootState) => {
      const activeTodosCount = todos.filter(t => !t.completed).length

      return { activeTodosCount, todos, filters }
    },
    (dispatch: ConnectDispatch) =>
      bindActionCreators(
        {
          toggleAllTodos,
        },
        dispatch
      )
  )
)(Main)
