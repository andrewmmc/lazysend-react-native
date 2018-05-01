// @flow
import * as React from 'react'
import { StyleSheet, WebView } from 'react-native'
import type { NavigationScreenProp } from 'react-navigation'
import { Container } from 'native-base'

// Related issue: What is the correct Flow type for the `navigation` props of a screen?
// https://github.com/react-navigation/react-navigation/issues/3643
type Props = {
  navigation: NavigationScreenProp<any>
}

type State = {}

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  }
})

export default class InAppWebView extends React.Component<Props, State> {
  static defaultProps = {
    navigation: {
      state: {
        params: {
          title: ''
        }
      }
    }
  }

  static navigationOptions = ({navigation} : {navigation: NavigationScreenProp<any>}) => {
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
