// @flow
import * as React from 'react'
import { YellowBox } from 'react-native'
import { Navigation } from './config/Navigation'

// Dirty fix for react-navigation issue & react-native issue
// https://github.com/react-navigation/react-navigation/issues/3956
// https://github.com/facebook/react-native/issues/18201
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule was not exported'
])

type Props = {}

type State = {}

export default class App extends React.Component<Props, State> {
  render () {
    return <Navigation />
  }
}
