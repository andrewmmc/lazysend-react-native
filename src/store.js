import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import forEachObjIndexed from 'ramda/src/forEachObjIndexed'

import sagas from './sagas/index'
import reducers from './reducers/index'

const sagaMiddleWare = createSagaMiddleware()
const middlewares = []

let composeEnhancers = compose

export default function configureStore (initialState) {
  middlewares.push(sagaMiddleWare)
  const composeMiddleware = composeEnhancers(applyMiddleware(...middlewares))
  const createStoreWithMiddleware = composeMiddleware(createStore)
  const store = createStoreWithMiddleware(reducers, initialState)
  forEachObjIndexed(saga => sagaMiddleWare.run(saga))(sagas)
  return store
}
