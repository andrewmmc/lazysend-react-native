import { combineReducers } from 'redux'
import nav from './nav'
import sendReducer from './send/index'

const AppReducer = combineReducers({
  nav,
  send: sendReducer
})

export default AppReducer
