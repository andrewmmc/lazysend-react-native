// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Platform, StyleSheet, Linking } from 'react-native'
import { Text, Container, Content, Grid, Col, Form, Item, Input, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import SimplePicker from 'react-native-simple-picker'
import Country from '../utils/Country'
import * as Url from '../utils/Url'

import { Creators as SendCreators } from '../actions/sendAction'
import { Creators as LazyMessageCreators } from '../actions/lazyMessageAction'

const options = Country.map(elem => elem.dialCode)
const labels = Country.map(elem => elem.name)
const styles = StyleSheet.create({
  'icon': {
    fontSize: 72,
    color: '#495963',
    textAlign: 'center'
  },
  'leadingText': {
    color: '#495963',
    fontSize: 16,
    paddingTop: 20,
    textAlign: 'center'
  },
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  },
  'homeContainer': {
    paddingLeft: 20,
    paddingRight: 20
  },
  'textContainer': {
    paddingTop: 50,
    paddingBottom: 50
  },
  'pickerContainer': {
    marginBottom: 15
  },
  'pickerContainerDisabled': {
    opacity: 0.5
  },
  'picker': {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  'inputContainer': {
    marginBottom: 15
  },
  'sendBtn': {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  'sendBtnDisabled': {
    backgroundColor: 'rgba(91, 184, 92, 0.5)'
  },
  'pickerBtn': {
    color: '#057AFF',
    fontSize: 20
  }
})

type Messages = {
  key: number,
  message: string
}

type Props = {
  selectedCountryIndex: number,
  whatsAppInstalled: boolean,
  initSendData: () => mixed,
  initLazyMessageData: () => mixed,
  updateSelectedCountryIndex: (number) => mixed,
  messages: Array<Messages>,
}

type State = {
  phoneNumber: string,
  selectedMessageKey: number
}

class Send extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Add9u for Messages'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      phoneNumber: '',
      selectedMessageKey: 0
    }
  }

  componentDidMount () {
    // TODO: Move init data to App.js
    const { initSendData, initLazyMessageData } = this.props
    initSendData()
    initLazyMessageData()
  }

  getCountryIndexByValue = (name: string, value: string): number => (
    // TODO: Fix the bug - options with same country code
    Country.findIndex(item => item[name] === value)
  )

  updateSelectedCountryIndex = (selectedCountryIndex: number) => {
    const { updateSelectedCountryIndex } = this.props
    updateSelectedCountryIndex(selectedCountryIndex)
  }

  getSelectedMessageByKey = (key: number): string => {
    const { messages } = this.props
    const index = messages.findIndex(item => item.key === key)
    return (messages && messages[index]) ? messages[index].message : 'Select Lazy Message'
  }

  sendMessage = (countryCode: string, phoneNumber: string, whatsAppInstalled: boolean = false) => {
    let url
    if (whatsAppInstalled) {
      url = (Platform.OS === 'ios') ? Url.WHATSAPP_IOS_SEND_URL : Url.WHATSAPP_ANDROID_SEND_URL
    } else {
      url = (Platform.OS === 'ios') ? Url.MESSAGE_IOS_SEND_URL : Url.MESSAGE_ANDROID_SEND_URL
    }
    Linking.openURL(url + countryCode + phoneNumber)
  }

  render () {
    const {whatsAppInstalled, selectedCountryIndex, messages} = this.props
    const {phoneNumber, selectedMessageKey} = this.state

    return (
      <Container style={styles.pageContainer}>
        <Content style={styles.homeContainer}>
          <Grid>
            <Col style={styles.textContainer}>
              <Icon name='ios-chatbubbles' style={styles.icon} />
              <Text style={styles.leadingText}>
                {whatsAppInstalled
                  ? 'Send a lazy WhatsApp message to a person with single click!'
                  : 'Send a lazy message to a person with single click!'}
              </Text></Col>
          </Grid>
          <Form>
            <Item style={styles.pickerContainer} onPress={() => this.refs.countryPicker.show()} regular>
              <Text style={styles.picker}>{Country[selectedCountryIndex].name}</Text>
            </Item>
            <Item style={styles.inputContainer} regular>
              <Input
                keyboardType='numeric'
                onChangeText={(value) => {
                  this.setState({phoneNumber: value})
                }}
                placeholder='Phone Number' />
            </Item>
            <Item
              // style={(messages.length === 0) ? [styles.pickerContainer, styles.pickerContainerDisabled] : styles.pickerContainer}
              style={styles.pickerContainer}
              onPress={() => this.refs.messagePicker.show()}
              regular>
              <Text style={styles.picker}>{this.getSelectedMessageByKey(selectedMessageKey)}</Text>
            </Item>
            <Button
              onPress={() => this.sendMessage(Country[selectedCountryIndex].dialCode, phoneNumber, whatsAppInstalled)}
              style={(phoneNumber === '') ? [styles.sendBtn, styles.sendBtnDisabled] : styles.sendBtn}
              disabled={phoneNumber === ''}
              title='Send Message'
              success><Text>Send Message</Text>
            </Button>
          </Form>
        </Content>
        <SimplePicker
          ref='countryPicker'
          options={options}
          labels={labels}
          initialOptionIndex={selectedCountryIndex}
          // StyleSheet.flatten() for converting as plain JS object
          // https://facebook.github.io/react-native/docs/stylesheet.html#flatten
          buttonStyle={StyleSheet.flatten([styles.pickerBtn])}
          onSubmit={(value) => {
            const index = this.getCountryIndexByValue('dialCode', value)
            this.updateSelectedCountryIndex(index)
          }}
        />
        <SimplePicker
          ref='messagePicker'
          options={messages.map(elem => elem.key)}
          labels={messages.map(elem => elem.message)}
          buttonStyle={StyleSheet.flatten([styles.pickerBtn])}
          onSubmit={(value) => {
            this.setState({selectedMessageKey: value})
          }}
        />
      </Container>
    )
  }
}

const mapStateToProps = ({ send, lazyMessage }) => ({
  selectedCountryIndex: send.selectedCountryIndex,
  whatsAppInstalled: send.whatsAppInstalled,
  messages: lazyMessage.messages
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    initSendData: SendCreators.initData,
    updateSelectedCountryIndex: SendCreators.updateSelectedCountryIndex,
    initLazyMessageData: LazyMessageCreators.initData
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Send)
