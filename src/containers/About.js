// @flow
import * as React from 'react'
import { StyleSheet, FlatList, View, Linking } from 'react-native'
import type { NavigationScreenProp, NavigationStateRoute } from 'react-navigation'
import { Container, ListItem, Text, Left, Body, Right } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  },
  'icon': {
    fontSize: 15,
    color: 'rgb(91, 184, 92)'
  },
  'arrow': {
    fontSize: 15,
    color: 'lightgray'
  }
})

type Items = {
  title: string,
  icon: string,
  inApp: boolean,
  url: string
}

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
}

type State = {
  items: Array<Items>
}

export default class About extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'About'
  }

  constructor (props: Props) {
    super(props)
    this.state = {
      items: [{
        'title': 'Project GitHub',
        'icon': 'logo-github',
        'url': 'https://github.com/andrewmmc/add9u-react-native',
        'inApp': false
      }, {
        'title': 'Open Source Licenses',
        'icon': 'ios-information-circle',
        'url': 'https://add9u.com/mobile/LICENSES.txt',
        'inApp': true
      }, {
        'title': 'Declaration',
        'icon': 'ios-alert',
        'url': 'https://add9u.com/mobile/DECLARATION.txt',
        'inApp': true
      }, {
        'title': '(c) 2018 Andrew Mok',
        'icon': 'ios-home',
        'url': 'https://andrewmmc.com',
        'inApp': false
      }]
    }
  }

  render () {
    const {items} = this.state
    const {navigate} = this.props.navigation

    const renderItem = ({item}) => (
      <ListItem icon onPress={() => item.inApp
        ? navigate('AboutWebView', {url: item.url, title: item.title})
        : Linking.openURL(item.url || '')}>
        <Left>
          <Icon name={item.icon} style={styles.icon} />
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
        <Right>
          <Icon name='ios-arrow-forward' style={styles.arrow} />
        </Right>
      </ListItem>
    )

    return (
      <Container style={styles.pageContainer}>
        <View>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Container>
    )
  }
}
