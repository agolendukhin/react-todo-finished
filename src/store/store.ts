import {
  createStore,
  Store,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import createSagaMiddleware, { END, SagaMiddleware } from 'redux-saga'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import * as reducers from './reducers'
import rootSaga from './sagas'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
)

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

let enhancer
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, logger))
} else {
  enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
}

interface Istore extends Store {
  runSaga: SagaMiddleware['run']
  close: () => void
}

export const store: Istore = createStore(persistedReducer, enhancer)

sagaMiddleware.run(rootSaga)

store.close = () => store.dispatch(END)

export const persistor = persistStore(store)
