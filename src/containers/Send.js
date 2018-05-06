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

import { Creators } from '../actions/sendAction'

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
  'countryCodePickerContainer': {
    marginBottom: 15
  },
  'countryCodePicker': {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
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

type Props = {
  selectedCountryIndex: number,
  whatsAppInstalled: boolean,
  initData: () => mixed,
  updateSelectedCountryIndex: (number) => mixed,
}

type State = {
  phoneNumber: string,
}

class Send extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Add9u'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      phoneNumber: ''
    }
  }

  componentDidMount () {
    const { initData } = this.props
    initData()
  }

  getCountryIndexByValue = (name: string, value: string): number => (
    // TODO: Fix the bug - options with same country code
    Country.findIndex(item => item[name] === value)
  )

  updateSelectedCountryIndex = (selectedCountryIndex: number) => {
    const { updateSelectedCountryIndex } = this.props
    updateSelectedCountryIndex(selectedCountryIndex)
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
    const {whatsAppInstalled, selectedCountryIndex} = this.props
    const {phoneNumber} = this.state
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
            <Item style={styles.countryCodePickerContainer} onPress={() => this.refs.picker.show()} regular>
              <Text style={styles.countryCodePicker}>{Country[selectedCountryIndex].name}</Text>
            </Item>
            <Item regular>
              <Input
                keyboardType='numeric'
                onChangeText={(value) => {
                  this.setState({phoneNumber: value})
                }}
                placeholder='Phone Number' />
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
          ref={'picker'}
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
      </Container>
    )
  }
}

const mapStateToProps = ({ send }) => ({
  selectedCountryIndex: send.selectedCountryIndex,
  whatsAppInstalled: send.whatsAppInstalled
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    reset: Creators.reset,
    initData: Creators.initData,
    updateSelectedCountryIndex: Creators.updateSelectedCountryIndex
  }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Send)
