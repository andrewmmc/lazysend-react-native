// @flow
import * as React from 'react'
import { Platform, StyleSheet, Linking } from 'react-native'
import { Text, Container, Content, Grid, Col, Form, Item, Input, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import SimplePicker from 'react-native-simple-picker'
import Country from '../utils/Country'
import * as Url from '../utils/Url'

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

type Props = {}

type State = {
  selectedIndex: number,
  phoneNumber: string
}

export default class WhatsApp extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Add9u for WhatsApp'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      selectedIndex: 93, // 93: Hong Kong, Use AsyncStorage later to store selected value for next time use
      phoneNumber: ''
    }
  }

  getCountryIndexByValue = (name: string, value: string): number => (
    Country.findIndex(item => item[name] === value)
  )

  sendMessage = (countryCode: string, phoneNumber: string) => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL(Url.WHATSAPP_IOS_SEND_URL + countryCode + phoneNumber)
        break
      case 'android':
      default:
        Linking.openURL(Url.WHATSAPP_ANDROID_SEND_URL + countryCode + phoneNumber)
    }
  }

  render () {
    const {selectedIndex, phoneNumber} = this.state
    return (
      <Container style={styles.pageContainer}>
        <Content style={styles.homeContainer}>
          <Grid>
            <Col style={styles.textContainer}>
              <Icon name='ios-chatbubbles' style={styles.icon} />
              <Text style={styles.leadingText}>
                Send a WhatsApp message to a person without adding him/her to phone book.
              </Text></Col>
          </Grid>
          <Form>
            <Item style={styles.countryCodePickerContainer} onPress={() => this.refs.picker.show()} regular>
              <Text style={styles.countryCodePicker}>{Country[selectedIndex].name}</Text>
            </Item>
            <Item regular>
              <Input
                keyboardType='numeric'
                onChangeText={(value) => this.setState({phoneNumber: value})}
                placeholder='Phone Number' />
            </Item>
            <Button
              onPress={() => this.sendMessage(Country[selectedIndex].dialCode, phoneNumber)}
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
          initialOptionIndex={selectedIndex}
          // StyleSheet.flatten() for converting as plain JS object
          // https://facebook.github.io/react-native/docs/stylesheet.html#flatten
          buttonStyle={StyleSheet.flatten([styles.pickerBtn])}
          onSubmit={(value) => {
            const index = this.getCountryIndexByValue('dialCode', value)
            this.setState({selectedIndex: index})
          }}
        />
      </Container>
    )
  }
}
