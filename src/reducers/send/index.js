import { combineReducers } from 'redux'
import { resettableReducer } from 'reduxsauce'
import sendReducer from './sendReducer'

const resettable = resettableReducer('RESET')

export default combineReducers({
  send: resettable(sendReducer)
})
