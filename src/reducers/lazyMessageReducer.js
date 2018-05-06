import { createReducer, resettableReducer } from 'reduxsauce'
import { Types } from '../actions/lazyMessageAction'

const resettable = resettableReducer('RESET')

const INIT_STATE = {
  messages: []
}

const reset = () => INIT_STATE

const onUpdateMessages = (state = INIT_STATE, { messages }) =>
  ({
    ...state,
    messages
  })

const lazyMessageHandler = createReducer(INIT_STATE, {
  [Types.RESET]: reset,
  RESET: reset,
  [Types.UPDATE_MESSAGES]: onUpdateMessages
})

export default resettable(lazyMessageHandler)
