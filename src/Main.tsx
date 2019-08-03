import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  Action,
  ActionCreator,
  bindActionCreators,
} from 'redux'
import { Header, VisibleTodoList, Footer, SignOut } from './components'
import { Todos, RootState, Error, ErrorAction, AuthUser } from './Types'
import { withFirebase } from './components/firebase'
import Loading from './components/Loading'
import { todosActions } from './store/todos'
import { withAuthUser } from './components/session'
import { Alert } from 'antd'
import { removeError } from './store/errors'
import AppVersion from './components/AppVersion'

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
  errors: Array<Error>
  removeError: ActionCreator<ErrorAction>
  authUser: AuthUser
}

const Main: React.FC<MainProps> = props => {
  const {
    todos,
    activeTodosCount,
    firebase,
    isFetching,
    fetchTodos,
    toggleAllTodos,
    errors,
    removeError,
    authUser,
  } = props

  useEffect(() => {
    fetchTodos({ userId: authUser.uid })
  }, [fetchTodos, authUser])

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
      {errors.map(error => (
        <Alert
          key={error.id}
          message={error.title}
          description={error.message}
          type="error"
          banner
          closable
          onClose={() => {
            removeError(error.id)
          }}
        />
      ))}
      <AppVersion />
    </React.Fragment>
  )
}

export default compose(
  withFirebase,
  withAuthUser,
  connect(
    ({
      todos: { todos, isFetching },
      filters,
      errors: { errors },
    }: RootState) => {
      const activeTodosCount = todos.filter(t => !t.completed).length

      return { activeTodosCount, todos, filters, errors, isFetching }
    },
    (dispatch: Dispatch) =>
      bindActionCreators({ fetchTodos, toggleAllTodos, removeError }, dispatch)
  )
)(Main) as React.ComponentType
