import React, { Component } from 'react'
import { YellowBox } from 'react-native'
import { AppInstalledChecker } from 'react-native-check-app-install'
import { Tab } from './config/Navigation'
import { Tab as TabWithoutWhatsApp } from './config/NavigationWithoutWhatsApp'

// Dirty fix for react-navigation issue
// https://github.com/react-navigation/react-navigation/issues/3956
// Dirty fix for react-native issue
// https://github.com/facebook/react-native/issues/18201
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule was not exported'
])

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      whatsAppInstalled: false
    }
  }

  async componentDidMount () {
    await AppInstalledChecker
      .checkURLScheme('whatsapp')
      .then((isInstalled) => {
        this.setState({whatsAppInstalled: isInstalled})
      })
  }

  render () {
    const {whatsAppInstalled} = this.state
    return (whatsAppInstalled ? <Tab /> : <TabWithoutWhatsApp />)
  }
}
