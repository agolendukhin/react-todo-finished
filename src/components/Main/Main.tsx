import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  compose,
  Dispatch,
  Action,
  ActionCreator,
  bindActionCreators,
} from 'redux'
import { Header, VisibleTodoList, Footer, SignOut } from '..'
import { Todos, RootState, Error, ErrorAction } from '../../Types'
import { withFirebase } from '../../firebase'
import Loading from '../Loading'
import { todosActions } from '../../store/todos'
import { Alert } from 'antd'
import { removeError } from '../../store/errors'
import { AppVersion } from '../AppVersion'

const { toggleAllTodos, fetchTodos } = todosActions

interface MainProps {
  todos: Todos
  activeTodosCount: number
  dispatch: Dispatch
  fetchTodos: ActionCreator<Action>
  toggleAllTodos: ActionCreator<Action>
  firebase: {
    signOut: () => void
    user: firebase.User
  }
  isFetching: boolean
  errors: Array<Error>
  removeError: ActionCreator<ErrorAction>
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
    firebase: { user },
  } = props

  useEffect(() => {
    fetchTodos({ userId: user.uid })
  }, [fetchTodos, user])

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
              <label
                id="toggle-all-label"
                onClick={handleToggleAllTodos}
                htmlFor="toggle-all"
              />
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
)(Main) as any
