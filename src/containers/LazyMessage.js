// @flow-weak
import * as React from 'react'
import { StyleSheet, Alert, FlatList } from 'react-native'
import { Button, Content, Container, SwipeRow, Icon, Text, Body, View } from 'native-base'

const MESSAGE_LIMIT = 50

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  }
})

type Messages = {
  key: number,
  message: string,
  createTime: number,
}

type Props = {}

type State = {
  messages: Array<Messages>
}

export default class LazyMessage extends React.Component<Props, State> {
  selectedRow: ?any
  component: Array<any>

  static navigationOptions = {
    title: 'Lazy Message'
  }

  state = {
    messages: [{
      key: 1,
      message: 'testing',
      createTime: 1525266891
    }, {
      key: 2,
      message: 'testing',
      createTime: 1525266891
    }, {
      key: 3,
      message: 'testing',
      createTime: 1525266891
    }, {
      key: 4,
      message: 'testing',
      createTime: 1525266891
    }]
  }
  component = []
  selectedRow = null

  removeMessage (key: number) {
    this.selectedRow._root.closeRow()
    let { messages } = this.state
    messages = messages.filter((item) => item.key !== key)
    this.setState({ messages })
    this.selectedRow = null
  }

  componentDidMount () {
    // get message for asyncStorage
  }

  render () {
    const { messages } = this.state

    const renderMessage = ({item}) => (
      <SwipeRow
        ref={(ref) => {
          this.component[item.key] = ref
        }}
        rightOpenValue={-75}
        body={
          <Body>
            <Text>{item.message} {item.key}</Text>
            <Text note>{item.createTime}</Text>
          </Body>
        }
        right={
          <Button full danger onPress={() => this.removeMessage(item.key)} title='Delete'>
            <Icon active name='trash' />
          </Button>
        }
        onRowOpen={() => {
          if (this.selectedRow && (this.selectedRow !== this.component[item.key])) {
            this.selectedRow._root.closeRow()
          }
          this.selectedRow = this.component[item.key]
        }}
        disableRightSwipe
      />
    )

    return (
      <Container style={styles.pageContainer}>
        <Content scrollEnabled={false}>
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
