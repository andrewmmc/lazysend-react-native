// @flow
import React from 'react'
import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Send from '../containers/Send'
import About from '../containers/About'
import InAppWebView from '../components/InAppWebView'

function SendIcon ({tintColor}: { tintColor: string }) {
  return (<Ionicons name='ios-chatbubbles' size={25} color={tintColor} />)
}

function AboutIcon ({tintColor}: { tintColor: string }) {
  return (<Ionicons name='ios-paper' size={25} color={tintColor} />)
}

const AboutStack = StackNavigator({
  About: {screen: About},
  AboutWebView: {screen: InAppWebView}
})

const route = {
  Send: {
    screen: Send,
    navigationOptions: {
      tabBarLabel: 'Send',
      tabBarIcon: SendIcon
    }
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: AboutIcon,
      header: null
    }
  }
}

export const MyTabNavigator = TabNavigator(route, {
  initialRouteName: 'Send',
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
