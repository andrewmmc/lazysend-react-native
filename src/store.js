import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'
import forEachObjIndexed from 'ramda/src/forEachObjIndexed'

import { middleware as navMiddleware } from './redux'
import sagas from './sagas/index'
import reducers from './reducers/index'

const sagaMiddleware = createSagaMiddleware()

const middlewares = []

let composeEnhancers = compose

/* global __DEV__ */
if (__DEV__) {
  console.log('*** Development Mode ***')
  middlewares.push(logger)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : composeEnhancers
}

export default function configureStore (initialState) {
  middlewares.push(navMiddleware)
  middlewares.push(sagaMiddleware)
  const composeMiddleware = composeEnhancers(applyMiddleware(...middlewares))
  const createStoreWithMiddleware = composeMiddleware(createStore)
  const store = createStoreWithMiddleware(reducers, initialState)
  forEachObjIndexed(saga => sagaMiddleware.run(saga))(sagas)
  return store
}
