import React from 'react'
import {StackNavigator} from 'react-navigation'
import WhatsApp from './components/WhatsApp'

export default StackNavigator({
	Home: {
		screen: WhatsApp
	}
}, {
	initialRouteName: 'Home'
})
