import { createActions } from 'reduxsauce'

const {Creators, Types} = createActions({
  reset: null,
  initData: null,
  updateMessages: ['messages'],
  addMessage: ['message'],
  removeMessage: ['key']
}, {prefix: 'lazyMessage:'})

export { Creators, Types }
