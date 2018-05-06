import { createActions } from 'reduxsauce'

const {Creators, Types} = createActions({
  reset: null,
  initData: null,
  updateWhatsappInstalled: ['whatsAppInstalled'],
  updateSelectedCountryIndex: ['selectedCountryIndex']
}, {prefix: 'send:'})

export { Creators, Types }
