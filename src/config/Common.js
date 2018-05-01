// @flow
import React from 'react'
import { StackNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import News from '../containers/News'
import WhatsApp from '../containers/WhatsApp'
import InAppWebView from '../components/InAppWebView'
import About from '../containers/About'

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
  Home: {screen: WhatsApp}
})

export const NewsStack = StackNavigator({
  News: {screen: News},
  NewsWebView: {screen: InAppWebView}
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
