// @flow
import * as React from 'react'
import { Provider } from 'react-redux'
import { YellowBox } from 'react-native'
import AppWithNavigationState from './navigators/Navigator'
import configureStore from './store'

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

const store = configureStore()

export default class App extends React.Component<Props, State> {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
