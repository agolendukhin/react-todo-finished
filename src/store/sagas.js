import { all } from 'redux-saga/effects'
import { sagas as todosSagas } from './todos'

export default function* rootSaga() {
  yield all(
    [...todosSagas].map(function*(saga) {
      yield saga.effect(saga.action, saga.saga)
    })
  )
}
