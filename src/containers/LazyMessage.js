// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native'
import { Button, Content, Container, SwipeRow, Text, Body } from 'native-base'
import prompt from 'react-native-prompt-android'
import Icon from 'react-native-vector-icons/Ionicons'
import type { NavigationScreenProp } from 'react-navigation'

import { Creators } from '../actions/lazyMessageAction'

const MESSAGE_LIMIT = 30

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  },
  'contentContainer': {
    flexGrow: 1
  },
  'icon': {
    fontSize: 30,
    color: 'rgb(91, 184, 92)',
    marginRight: 10
  }
})

type Messages = {
  key: number,
  message: string
}

// Related issue: What is the correct Flow type for the `navigation` props of a screen?
// https://github.com/react-navigation/react-navigation/issues/3643
type Props = {
  initData: () => mixed,
  addMessage: (string) => mixed,
  removeMessage: (number) => mixed,
  messages: Array<Messages>,
  navigation: NavigationScreenProp<any>
}

type State = {}

class LazyMessage extends React.Component<Props, State> {
  selectedRow: ?SwipeRow
  component: Array<SwipeRow>

  // Header interaction with its screen component
  // https://reactnavigation.org/docs/header-buttons.html#header-interaction-with-its-screen-component
  // Best pattern for a 'Save' button in the header
  // https://github.com/react-navigation/react-navigation/issues/145
  static navigationOptions = ({navigation}: { navigation: NavigationScreenProp<any> }) => {
    const {params} = navigation.state
    return {
      title: 'Lazy Messages',
      headerRight: (
        <TouchableOpacity onPress={params ? params.openAddMessageDialog : () => {}} title='Create'>
          <Icon name='ios-create-outline' style={styles.icon} />
        </TouchableOpacity>
      )
    }
  }

  component = []
  selectedRow = null

  componentWillMount () {
    const {setParams} = this.props.navigation
    setParams({openAddMessageDialog: this.openAddMessageDialog})

    // try {
    //   const { initData } = this.props
    //   initData()
    // } catch (e) {
    //   Alert.alert('Unable to load list', '', [{text: 'OK', onPress: () => console.log('OK')}], {cancelable: false})
    // }
  }

  openAddMessageDialog = () => {
    const { messages } = this.props
    if (messages && messages.length >= MESSAGE_LIMIT) {
      Alert.alert('Messages limit reached', 'Only ' + MESSAGE_LIMIT + ' messages could be added to the list.',
        [{text: 'OK', onPress: () => console.log('OK')}], {cancelable: false})
      return
    }

    prompt(
      'New Lazy Message',
      '',
      [ { text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel' },
        { text: 'OK', onPress: (message) => this.addMessage(message) } ],
      { type: 'plain-text', cancelable: true, defaultValue: '', placeholder: 'Message' }
    )
  }

  addMessage (message: string) {
    if (message === '') {
      Alert.alert('Please input message', '',
        [{text: 'OK', onPress: () => console.log('OK')}], {cancelable: false})
      return
    }

    try {
      const { addMessage } = this.props
      addMessage(message)
    } catch (e) {
      Alert.alert('Unexpected Error', '', [{text: 'OK', onPress: () => console.log('OK')}], {cancelable: false})
    }
  }

  removeMessage (key: number) {
    try {
      if (this.selectedRow && this.selectedRow._root) {
        this.selectedRow._root.closeRow()
      }
      const { removeMessage } = this.props
      removeMessage(key)
    } catch (e) {
      Alert.alert('Unexpected Error', '', [{text: 'OK', onPress: () => console.log('OK')}], {cancelable: false})
    }
  }

  onRowOpen (item: Messages) {
    if (this.selectedRow && this.selectedRow._root && (this.selectedRow !== this.component[item.key])) {
      this.selectedRow._root.closeRow()
    }
    this.selectedRow = this.component[item.key]
  }

  render () {
    const { messages } = this.props

    const renderMessage = ({item}) => (
      <SwipeRow
        ref={(ref) => { this.component[item.key] = ref }}
        rightOpenValue={-90}
        body={
          <Body>
            <Text>{item.message}</Text>
          </Body>
        }
        right={
          <Button full danger onPress={() => this.removeMessage(item.key)} title='Delete'>
            <Text>Delete</Text>
          </Button>
        }
        onRowOpen={() => { this.onRowOpen(item) }}
        disableRightSwipe
      />
    )

    return (
      <Container style={styles.pageContainer}>
        <Content
          // Content does not stretch to full height
          // https://github.com/GeekyAnts/NativeBase/issues/1336
          contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => index.toString()}
          />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = ({ lazyMessage }) => ({
  messages: lazyMessage.messages
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    reset: Creators.reset,
    initData: Creators.initData,
    addMessage: Creators.addMessage,
    removeMessage: Creators.removeMessage
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LazyMessage)
