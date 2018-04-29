import React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import News from '../containers/News'
import NewsWebView from '../containers/News/WebView'
import About from '../containers/About'
import AboutWebView from '../containers/About/WebView'

const NewsStack = StackNavigator({
  News: {screen: News},
  NewsWebView: {screen: NewsWebView}
})

const AboutStack = StackNavigator({
  About: {screen: About},
  AboutWebView: {screen: AboutWebView}
})

const route = {
  News: {
    screen: NewsStack,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-information-circle' size={25} color={tintColor} />
    }
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-paper' size={25} color={tintColor} />
    }
  }
}

export const Tab = TabNavigator(route,
  {
    initialRouteName: 'News',
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
)
