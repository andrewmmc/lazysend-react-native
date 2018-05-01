// @flow
import * as React from 'react'
import { StyleSheet, Linking } from 'react-native'
import type { NavigationScreenProp, NavigationStateRoute } from 'react-navigation'
import { Text, Container, Content, Grid, Col, Form, Item, Input, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import SimplePicker from 'react-native-simple-picker'
import CountryCode from '../utils/CountryCode'

const options = CountryCode.country.map(elem => elem.dialCode)
const labels = CountryCode.country.map(elem => elem.name)
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
  'sendMessageBtn': {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  'sendMessageBtnDisabled': {
    backgroundColor: 'rgba(91, 184, 92, 0.5)'
  }
})

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
}

type State = {
  selectedOption: string,
  phoneNumber: string
}

export default class WhatsApp extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Add9u for WhatsApp'
  }

  constructor (props: Props) {
    super(props)

    this.state = {
      selectedOption: '852',
      phoneNumber: ''
    }
  }

  render () {
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
            <Item style={styles.countryCodePickerContainer} onPress={() => {
              this.refs.picker.show()
            }} regular>
              {/* TODO: Show country name instead of country code */}
              <Text style={styles.countryCodePicker}>+{this.state.selectedOption}</Text>
            </Item>
            <Item regular>
              <Input keyboardType='numeric'
                onChangeText={(text) => this.setState({phoneNumber: text})}
                placeholder='Phone Number' />
            </Item>
            <Button
              style={(this.state.phoneNumber === '') ? [styles.sendMessageBtn, styles.sendMessageBtnDisabled] : styles.sendMessageBtn}
              onPress={() => Linking.openURL('whatsapp://send?phone=' + this.state.selectedOption + this.state.phoneNumber)}
              disabled={this.state.phoneNumber === ''}
              success><Text>Send Message</Text>
            </Button>
          </Form>
        </Content>
        <SimplePicker
          ref={'picker'}
          options={options}
          labels={labels}
          // TODO: not hard code options[93] as Hong Kong
          initialOptionIndex={93}
          buttonStyle={{
            color: '#057AFF',
            fontSize: 20
          }}
          onSubmit={(option) => {
            this.setState({
              selectedOption: option
            })
          }}
        />
      </Container>
    )
  }
}
