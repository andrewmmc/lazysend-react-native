// @flow
import { TabNavigator } from 'react-navigation'
import { NewsIcon, AboutIcon, NewsStack, AboutStack, tabConfig as config } from './Common'

const route = {
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

export const NavigationWithoutWhatsApp = TabNavigator(route, {
  initialRouteName: 'News',
  ...config
})
