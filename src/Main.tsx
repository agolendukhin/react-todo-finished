import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'
import { Header, VisibleTodoList, Footer, SignOut } from './components'
import {
  SET_IS_FETCHING,
  FETCH_TODOS_REQUESTED,
  TOGGLE_ALL_TODOS_LOCAL,
} from './store/actions'
import { Todos, RootState } from './Types'
import { withFirebase } from './components/firebase'

import Loading from './components/Loading'

interface MainProps {
  todos: Todos
  activeTodosCount: number
  dispatch: Dispatch
  firebase: {
    signOut: () => void
  }
  isFetching: boolean
}

const Main: React.FC<MainProps> = props => {
  const { todos, activeTodosCount, firebase, isFetching, dispatch } = props

  useEffect(() => {
    dispatch({ type: SET_IS_FETCHING, isFetching: true })
    dispatch({ type: FETCH_TODOS_REQUESTED })
  }, [dispatch])

  const handleToggleAllTodos = () => {
    const completed = activeTodosCount ? true : false
    dispatch({ type: TOGGLE_ALL_TODOS_LOCAL, todos, completed })
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
  connect(({ todos, filters, scope: { isFetching } }: RootState) => {
    const activeTodosCount = todos.filter(t => !t.completed).length

    return { activeTodosCount, todos, filters, isFetching }
  })
)(Main) as React.ComponentType
