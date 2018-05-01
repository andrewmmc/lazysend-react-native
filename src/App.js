// @flow
import * as React from 'react'
import { YellowBox } from 'react-native'
import { AppInstalledChecker } from 'react-native-check-app-install'
import { Navigation } from './config/Navigation'
import { NavigationWithoutWhatsApp } from './config/NavigationWithoutWhatsApp'

// Dirty fix for react-navigation issue & react-native issue
// https://github.com/react-navigation/react-navigation/issues/3956
// https://github.com/facebook/react-native/issues/18201
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule was not exported'
])

type Props = {}

type State = {
  whatsAppInstalled: boolean,
}

export default class App extends React.Component<Props, State> {
  state = {
    whatsAppInstalled: false
  }

  async componentDidMount () {
    const response = await AppInstalledChecker.checkURLScheme('whatsapp')
    this.setState({whatsAppInstalled: response})
  }

  shouldComponentUpdate (nextProps: Props, nextState: State): boolean {
    return (nextState.whatsAppInstalled !== this.state.whatsAppInstalled)
  }

  render () {
    const {whatsAppInstalled} = this.state
    return (whatsAppInstalled ? <Navigation /> : <NavigationWithoutWhatsApp />)
  }
}
