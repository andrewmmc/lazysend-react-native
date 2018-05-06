import { combineReducers } from 'redux'
import navReducer from './navReducer'
import sendReducer from './sendReducer'
import lazyMessageReducer from './lazyMessageReducer'

const AppReducer = combineReducers({
  nav: navReducer,
  send: sendReducer,
  lazyMessage: lazyMessageReducer
})

export default AppReducer
