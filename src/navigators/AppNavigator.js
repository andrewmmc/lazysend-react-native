// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import type { NavigationScreenProp } from 'react-navigation'
import { MyTabNavigator } from './TabNavigator'
import { addListener } from '../redux'

type Props = {
  dispatch: () => boolean,
  nav: NavigationScreenProp<any>
}

type State = {}

export const AppNavigator = StackNavigator({
  Home: { screen: MyTabNavigator }
})

class AppWithNavigationState extends React.Component<Props, State> {
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
