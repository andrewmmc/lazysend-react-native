import { createReducer, resettableReducer } from 'reduxsauce'
import { Types } from '../actions/sendAction'

const resettable = resettableReducer('RESET')

const INIT_STATE = {
  selectedCountryIndex: 93,
  whatsAppInstalled: false
}

const reset = () => INIT_STATE

const onUpdateWhatsAppInstalled = (state = INIT_STATE, { whatsAppInstalled }) =>
  ({
    ...state,
    whatsAppInstalled
  })

const onUpdateSelectedCountryIndex = (state = INIT_STATE, { selectedCountryIndex }) =>
  ({
    ...state,
    selectedCountryIndex
  })

const sendHandler = createReducer(INIT_STATE, {
  [Types.RESET]: reset,
  RESET: reset,
  [Types.UPDATE_WHATSAPP_INSTALLED]: onUpdateWhatsAppInstalled,
  [Types.UPDATE_SELECTED_COUNTRY_INDEX]: onUpdateSelectedCountryIndex
})

export default resettable(sendHandler)
