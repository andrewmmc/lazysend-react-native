// @flow
import { TabNavigator } from 'react-navigation'
import { HomeIcon, NewsIcon, AboutIcon, HomeStack, LazyMessageStack, AboutStack, tabConfig as config } from './Common'

const route = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Send',
      tabBarIcon: HomeIcon
    }
  },
  LazyMessage: {
    screen: LazyMessageStack,
    navigationOptions: {
      tabBarLabel: 'Lazy Message',
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

export const Navigation = TabNavigator(route, {
  initialRouteName: 'Home',
  ...config
})
