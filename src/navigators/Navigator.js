// @flow-weak
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Send from '../containers/Send'
import News from '../containers/News'
import About from '../containers/About'
import InAppWebView from '../components/InAppWebView'
import { addListener } from '../utils/redux'

function HomeIcon ({tintColor}:{tintColor: string}) {
  return (<Ionicons name='ios-chatbubbles' size={25} color={tintColor} />)
}

function NewsIcon ({tintColor}:{tintColor: string}) {
  return (<Ionicons name='ios-information-circle' size={25} color={tintColor} />)
}

function AboutIcon ({tintColor}:{tintColor: string}) {
  return (<Ionicons name='ios-paper' size={25} color={tintColor} />)
}

const HomeStack = StackNavigator({
  Home: {screen: Send}
})

const NewsStack = StackNavigator({
  News: {screen: News}
})

const AboutStack = StackNavigator({
  About: {screen: About},
  AboutWebView: {screen: InAppWebView}
})

const route = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Send',
      tabBarIcon: HomeIcon
    }
  },
  News: {
    screen: NewsStack,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: NewsIcon
    }
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: AboutIcon
    }
  }
}

export const Navigator = TabNavigator(route, {
  initialRouteName: 'Home',
  tabBarOptions: {
    activeTintColor: 'rgb(91, 184, 92)',
    inactiveTintColor: 'gray',
    tabStyle: {
      padding: 0,
      margin: 0
    },
    iconStyle: {
      width: 30,
      height: 30,
      padding: 0
    }
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false
})

class AppWithNavigationState extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
  };

  render () {
    const { dispatch, nav } = this.props;
    return (
      <Navigator
        navigation={{
          dispatch,
          state: nav,
          addListener
        }}
      />
    )
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)
