import { combineReducers } from 'redux'
import navReducer from './navReducer'
import sendReducer from './sendReducer'

const AppReducer = combineReducers({
  nav: navReducer,
  send: sendReducer
})

export default AppReducer
