import React, { Component } from 'react'
import { StyleSheet, WebView } from 'react-native'
import PropTypes from 'prop-types'
import { Container } from 'native-base'

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  }
})

export default class InAppWebView extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          url: PropTypes.string.isRequired,
          title: PropTypes.string
        })
      })
    }).isRequired
  }

  static defaultProps = {
    navigation: {
      state: {
        params: {
          title: ''
        }
      }
    }
  }

  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params
    return {title}
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
