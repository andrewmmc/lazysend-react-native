// @flow
import * as React from 'react'
import { Platform, StyleSheet, Linking } from 'react-native'
import type { NavigationScreenProp } from 'react-navigation'
import { AppInstalledChecker } from 'react-native-check-app-install'
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

// Related issue: What is the correct Flow type for the `navigation` props of a screen?
// https://github.com/react-navigation/react-navigation/issues/3643
type Props = {
  navigation: NavigationScreenProp<any>
}

type State = {
  selectedIndex: number,
  phoneNumber: string,
  whatsAppInstalled: boolean
}

export default class Send extends React.Component<Props, State> {
  static navigationOptions = ({navigation} : {navigation: NavigationScreenProp<any>}) => {
    const { params } = navigation.state
    return {title: params ? params.title : 'Add9u for Message'}
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      selectedIndex: 93, // 93: Hong Kong, Use AsyncStorage later to store selected value for next time use
      phoneNumber: '',
      whatsAppInstalled: false // TODO: Provide option for switching Message and WhatsApp in settings
    }
  }

  async componentDidMount () {
    const { setParams } = this.props.navigation
    // const response = await AppInstalledChecker.checkURLScheme('whatsapp')
    const response = false
    this.setState({whatsAppInstalled: response})
    setParams({ title: response ? 'Add9u for WhatsApp' : 'Add9u for Message' })
  }

  getCountryIndexByValue = (name: string, value: string): number => (
    Country.findIndex(item => item[name] === value)
  )

  sendWhatsAppMessage = (countryCode: string, phoneNumber: string) => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL(Url.WHATSAPP_IOS_SEND_URL + countryCode + phoneNumber)
        break
      case 'android':
      default:
        Linking.openURL(Url.WHATSAPP_ANDROID_SEND_URL + countryCode + phoneNumber)
    }
  }

  sendMessage = (countryCode: string, phoneNumber: string) => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL(Url.MESSAGE_IOS_SEND_URL + countryCode + phoneNumber)
        break
      case 'android':
      default:
        Linking.openURL(Url.MESSAGE_ANDROID_SEND_URL + countryCode + phoneNumber)
    }
  }

  render () {
    const {selectedIndex, phoneNumber, whatsAppInstalled} = this.state
    return (
      <Container style={styles.pageContainer}>
        <Content style={styles.homeContainer}>
          <Grid>
            <Col style={styles.textContainer}>
              <Icon name='ios-chatbubbles' style={styles.icon} />
              <Text style={styles.leadingText}>
                {whatsAppInstalled
                  ? 'Send an lazy WhatsApp message to a person with single click!'
                  : 'Send an lazy message to a person with single click!'}
              </Text></Col>
          </Grid>
          <Form>
            <Item style={styles.countryCodePickerContainer} onPress={() => this.refs.picker.show()} regular>
              <Text style={styles.countryCodePicker}>{Country[selectedIndex].name}</Text>
            </Item>
            <Item regular>
              <Input
                keyboardType='numeric'
                onChangeText={(value) => {
                  this.setState({phoneNumber: value})
                  console.log(value)
                }}
                placeholder='Phone Number' />
            </Item>
            <Button
              onPress={() => whatsAppInstalled
                ? this.sendWhatsAppMessage(Country[selectedIndex].dialCode, phoneNumber)
                : this.sendMessage(Country[selectedIndex].dialCode, phoneNumber)}
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
