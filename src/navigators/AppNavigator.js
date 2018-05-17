// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation'
import type { NavigationScreenProp } from 'react-navigation'
import { MyTabNavigator } from './TabNavigator'
import { addListener } from '../redux'

type Props = {
  dispatch: (any) => boolean,
  nav: NavigationScreenProp<any>
}

type State = {}

export const AppNavigator = StackNavigator({
  Home: { screen: MyTabNavigator }
})

class AppWithNavigationState extends React.Component<Props, State> {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render () {
    const { dispatch, nav } = this.props
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener
        })}
      />
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)
