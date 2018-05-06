import { put, select, takeEvery } from 'redux-saga/effects'
import store from 'react-native-simple-store'
import { Creators, Types } from '../actions/lazyMessageAction'

export function * onInitData () {
  try {
    const messages = yield store.get('messages')
    if (messages !== null && messages !== []) {
      yield put(Creators.updateMessages(messages))
    }
  } catch (e) {
    console.error(e)
    throw e
  }
}

export function * onAddMessage ({message}) {
  try {
    const {messages} = yield select(state => state.lazyMessage)
    const key = (messages && messages.length > 0) ? messages[messages.length - 1].key + 1 : 1
    yield put(Creators.updateMessages([...messages, {key, message}]))
    yield store.push('messages', {key, message})
  } catch (e) {
    console.error(e)
    throw e
  }
}

export function * onRemoveMessage ({key}) {
  try {
    const {messages} = yield select(state => state.lazyMessage)
    const newMessages = messages.filter((item) => item.key !== key)
    yield put(Creators.updateMessages((newMessages.length > 0) ? newMessages : []))
    yield store.save('messages', (newMessages.length > 0) ? newMessages : [])
  } catch (e) {
    console.error(e)
    throw e
  }
}

function * lazyMessageSaga () {
  yield takeEvery(Types.INIT_DATA, onInitData)
  yield takeEvery(Types.ADD_MESSAGE, onAddMessage)
  yield takeEvery(Types.REMOVE_MESSAGE, onRemoveMessage)
}

export default lazyMessageSaga
