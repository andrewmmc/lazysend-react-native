import React from 'react'
import { YellowBox } from 'react-native'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import { AppInstalledChecker } from 'react-native-check-app-install'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WhatsApp from './containers/WhatsApp'
import News from './containers/News'
import NewsWebView from './containers/News/WebView'
import About from './containers/About'
import AboutWebView from './containers/About/WebView'

// Dirty fix for react-navigation issue
// https://github.com/react-navigation/react-navigation/issues/3956
// Dirty fix for react-native issue
// https://github.com/facebook/react-native/issues/18201
YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule was not exported',
])

let debug = false
let whatsAppInstalled = false

if (!debug) {
  AppInstalledChecker
    .isAppInstalled('whatsapp')
    .then((isInstalled) => {
      whatsAppInstalled = isInstalled
    })
} else {
  whatsAppInstalled = true
}

const HomeStack = StackNavigator({
  Home: { screen: WhatsApp },
})

const NewsStack = StackNavigator({
  News: { screen: News },
  NewsWebView: { screen: NewsWebView }
})

const AboutStack = StackNavigator({
  About: { screen: About },
  AboutWebView: { screen: AboutWebView },
})

const route = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Add9u',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatbubbles" size={25} color={tintColor} />,
    },
  }
}

const remainingRoute = {
  News: {
    screen: NewsStack,
    navigationOptions: {
      tabBarLabel: 'News',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-information-circle" size={25} color={tintColor} />,
    },
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-paper" size={25} color={tintColor} />,
    },
  },
}

export default TabNavigator (
  whatsAppInstalled
  ? {...route, ...remainingRoute}
  : {...remainingRoute},
  {
    initialRouteName: whatsAppInstalled ? 'Home' : 'News',
    tabBarOptions: {
      activeTintColor: 'rgb(91, 184, 92)',
      inactiveTintColor: 'gray',
      tabStyle: {
        padding: 0,
        margin: 0,
      },
      iconStyle: {
        width: 30,
        height: 30,
        padding: 0,
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)
