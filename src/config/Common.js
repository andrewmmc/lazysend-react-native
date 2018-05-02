// @flow
import React from 'react'
import { StackNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Send from '../containers/Send'
import LazyMessage from '../containers/LazyMessage'
import About from '../containers/About'
import InAppWebView from '../components/InAppWebView'

export function HomeIcon ({tintColor}:{tintColor: string}) {
  return (<Ionicons name='ios-chatbubbles' size={25} color={tintColor} />)
}

export function NewsIcon ({tintColor}:{tintColor: string}) {
  return (<Ionicons name='ios-information-circle' size={25} color={tintColor} />)
}

export function AboutIcon ({tintColor}:{tintColor: string}) {
  return (<Ionicons name='ios-paper' size={25} color={tintColor} />)
}

export const HomeStack = StackNavigator({
  Home: {screen: Send}
})

export const LazyMessageStack = StackNavigator({
  LazyMessage: {screen: LazyMessage}
})

export const AboutStack = StackNavigator({
  About: {screen: About},
  AboutWebView: {screen: InAppWebView}
})

export const tabConfig = {
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
}
