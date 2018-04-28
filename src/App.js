import React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WhatsApp from './containers/WhatsApp'
import News from './containers/News'
import NewsWebView from './containers/News/WebView'
import About from './containers/About'
import AboutWebView from './containers/About/WebView'

const HomeStack = StackNavigator({
  Home: { screen: WhatsApp },
});

const NewsStack = StackNavigator({
  News: { screen: News },
  NewsWebView: { screen: NewsWebView }
});

const AboutStack = StackNavigator({
  About: { screen: About },
  AboutWebView: { screen: AboutWebView },
});

export default TabNavigator (
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Add9u',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-chatbubbles" size={25} color={tintColor} />,
      },
    },
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
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-information-circle" size={25} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'rgb(91, 184, 92)',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)
