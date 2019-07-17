import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { api } from '../components/firebase'

import {
  FETCH_TODOS_REQUESTED,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  ADD_TODO_SERVER,
  ADD_TODO_SERVER_ERROR,
  ADD_TODO_LOCAL,
  REMOVE_TODO_LOCAL,
  REMOVE_TODO_SERVER,
  REMOVE_TODO_SERVER_ERROR,
  UPDATE_TODO_LOCAL,
  UPDATE_TODO_SERVER,
  UPDATE_TODO_SERVER_ERROR,
  TOGGLE_ALL_TODOS_LOCAL,
  TOGGLE_ALL_TODOS_SERVER,
  TOGGLE_ALL_TODOS_SERVER_ERROR,
  CLEAR_COMPLETED_LOCAL,
  CLEAR_COMPLETED_SERVER,
  CLEAR_COMPLETED_SERVER_ERROR,
  SET_IS_FETCHING,
} from './actions'

function* getTodos() {
  try {
    const todos = yield call(api.fetchTodos)

    yield put({ type: FETCH_TODOS_SUCCESS, todos })
    yield put({ type: SET_IS_FETCHING, isFetching: false })
  } catch (error) {
    yield put({ type: FETCH_TODOS_ERROR, error })
  }
}

function* addTodo({ todo }) {
  try {
    const { id: serverId } = yield call(api.addTodo, todo)

    yield put({ type: ADD_TODO_SERVER, todo: { ...todo, serverId } })
  } catch (error) {
    yield put({ type: ADD_TODO_SERVER_ERROR, error })
  }
}

function* removeTodo({ todo }) {
  try {
    yield call(api.removeTodo, todo.serverId)

    yield put({ type: REMOVE_TODO_SERVER })
  } catch (error) {
    yield put({ type: REMOVE_TODO_SERVER_ERROR, error })
  }
}

function* updateTodo({ todo }) {
  try {
    yield call(api.updateTodo, todo)

    yield put({ type: UPDATE_TODO_SERVER })
  } catch (error) {
    yield put({ type: UPDATE_TODO_SERVER_ERROR, error })
  }
}

function* toggleAllTodos({ todos, completed }) {
  try {
    yield call(api.toggleAllTodos, todos, completed)

    yield put({ type: TOGGLE_ALL_TODOS_SERVER })
  } catch (error) {
    yield put({ type: TOGGLE_ALL_TODOS_SERVER_ERROR, error })
  }
}

function* clearCompletedTodos({ todos }) {
  try {
    yield call(api.clearCompleted, todos)

    yield put({ type: CLEAR_COMPLETED_SERVER })
  } catch (error) {
    yield put({ type: CLEAR_COMPLETED_SERVER_ERROR, error })
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest(FETCH_TODOS_REQUESTED, getTodos),
    yield takeEvery(ADD_TODO_LOCAL, addTodo),
    yield takeEvery(REMOVE_TODO_LOCAL, removeTodo),
    yield takeEvery(UPDATE_TODO_LOCAL, updateTodo),
    yield takeEvery(TOGGLE_ALL_TODOS_LOCAL, toggleAllTodos),
    yield takeEvery(CLEAR_COMPLETED_LOCAL, clearCompletedTodos),
  ])
}
