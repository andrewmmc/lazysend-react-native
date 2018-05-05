import { createReducer } from 'reduxsauce'
import { Types } from '../../actions/sendAction'

const INIT_STATE = {
  selectedIndex: 93
}

const reset = () => INIT_STATE

const onTestingSuccess = (state = INIT_STATE) =>
  ({
    ...state,
    selectedIndex: 94
  })

const Handler = createReducer(INIT_STATE, {
  [Types.RESET]: reset,
  RESET: reset,
  // [Types.TESTING]: onTesting,
  [Types.TESTING_SUCCESS]: onTestingSuccess
})

export default Handler
