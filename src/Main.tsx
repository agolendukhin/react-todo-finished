import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  Action,
  ActionCreator,
  bindActionCreators,
} from 'redux'
import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'
import { Header, VisibleTodoList, Footer, SignOut } from './components'

import { Todos, RootState } from './Types'
import { withFirebase } from './components/firebase'

import Loading from './components/Loading'
import { todosActions } from './store/todos'
import { withAuthUser } from './components/session'

const { toggleAllTodos, fetchTodos } = todosActions

interface MainProps {
  todos: Todos
  activeTodosCount: number
  dispatch: Dispatch
  fetchTodos: ActionCreator<Action>
  toggleAllTodos: ActionCreator<Action>
  firebase: {
    signOut: () => void
  }
  isFetching: boolean
}

const Main: React.FC<MainProps> = props => {
  const {
    todos,
    activeTodosCount,
    firebase,
    isFetching,
    dispatch,
    fetchTodos,
    toggleAllTodos,
  } = props

  useEffect(() => {
    fetchTodos()
  }, [dispatch, fetchTodos])

  const handleToggleAllTodos = () => {
    const completed = activeTodosCount ? true : false
    toggleAllTodos({ todos, completed })
  }

  const todosCount = todos.length
  const completedTodosCount = todosCount - activeTodosCount

  if (isFetching) return <Loading />

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
  withAuthUser,
  connect(
    ({ todos: { todos, isFetching }, filters }: RootState) => {
      const activeTodosCount = todos.filter(t => !t.completed).length

      return { activeTodosCount, todos, filters, isFetching }
    },
    (dispatch: Dispatch) =>
      bindActionCreators({ fetchTodos, toggleAllTodos }, dispatch)
  )
)(Main) as React.ComponentType
