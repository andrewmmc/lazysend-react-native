import React, { Component } from 'react'
import { StyleSheet, WebView } from 'react-native'
import { Container } from 'native-base'

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  }
})

export default class News extends Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params
    return {
      title: title || 'Social Media News'
    }
  }

  render () {
    const {url} = this.props.navigation.state.params

    return (
      <Container style={styles.pageContainer}>
        <WebView
          source={{uri: url}}
        />
      </Container>
    )
  }
}
