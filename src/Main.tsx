import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import '../node_modules/todomvc-common/base.css'
import '../node_modules/todomvc-app-css/index.css'
import { Header, VisibleTodoList, Footer, SignOut } from './components'
import { toggleAllTodos, getTodos } from './store/actions'
import {
  Todos,
  TodoActionCreator,
  RootState,
  ConnectDispatch,
  TDB,
} from './Types'
import { withFirebase } from './components/firebase'

import Loading from './components/Loading'

interface MainProps {
  todos: Todos
  activeTodosCount: number
  toggleAllTodos: TodoActionCreator
  getTodos: TodoActionCreator
  firebase: {
    signOut: () => void
    db: TDB
  }
  isFetching: boolean
}

const Main: React.FC<MainProps> = props => {
  const {
    todos,
    activeTodosCount,
    toggleAllTodos,
    firebase,
    getTodos,
    isFetching,
  } = props

  useEffect(() => {
    getTodos(firebase.db)
  }, [getTodos, firebase])

  const handleToggleAllTodos = () => {
    const completed = activeTodosCount ? true : false
    toggleAllTodos(firebase.db, completed)
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
  connect(
    ({ todos, filters, scope: { isFetching } }: RootState) => {
      const activeTodosCount = todos.filter(t => !t.completed).length

      return { activeTodosCount, todos, filters, isFetching }
    },
    (dispatch: ConnectDispatch) =>
      bindActionCreators(
        {
          toggleAllTodos,
          getTodos,
        },
        dispatch
      )
  )
)(Main) as React.ComponentType
