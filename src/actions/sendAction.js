import { createActions } from 'reduxsauce'

const {Creators, Types} = createActions({
  reset: null,
  testing: null,
  testingSuccess: null
}, {prefix: 'send'})

export { Creators, Types }
