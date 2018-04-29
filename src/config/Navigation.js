import { TabNavigator } from 'react-navigation'
import { HomeIcon, NewsIcon, AboutIcon, HomeStack, NewsStack, AboutStack, tabConfig as config } from './Common'

const route = {
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Add9u',
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

export const Navigation = TabNavigator(route, {
  initialRouteName: 'Home',
  ...config
})
