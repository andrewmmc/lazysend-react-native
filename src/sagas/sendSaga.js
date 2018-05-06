import { put, takeEvery } from 'redux-saga/effects'
import store from 'react-native-simple-store'
import { AppInstalledChecker } from 'react-native-check-app-install'
import { Creators, Types } from '../actions/sendAction'

export function * initData () {
  const selectedCountryIndex = yield store.get('sendSelectedCountryIndex')
  if (selectedCountryIndex !== null) {
    yield put(Creators.updateSelectedCountryIndex(selectedCountryIndex))
  }
  const whatsAppInstalled = yield AppInstalledChecker.checkURLScheme('whatsapp')
  yield put(Creators.updateWhatsappInstalled(whatsAppInstalled))
}

export function * onUpdateSelectedCountryIndex ({ selectedCountryIndex }) {
  try {
    yield store.save('sendSelectedCountryIndex', selectedCountryIndex)
  } catch (e) {
    console.error(e)
  }
}

function * sendSaga () {
  yield takeEvery(Types.INIT_DATA, initData)
  yield takeEvery(Types.UPDATE_SELECTED_COUNTRY_INDEX, onUpdateSelectedCountryIndex)
}

export default sendSaga
