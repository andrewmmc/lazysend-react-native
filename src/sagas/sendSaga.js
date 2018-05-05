import { put, takeEvery } from 'redux-saga/effects'
import { Creators, Types } from '../actions/sendAction'

export function * testing () {
  yield put(Creators.testingSuccess())
}

function * sendSaga () {
  yield takeEvery(Types.TESTING, testing)
}

export default sendSaga
