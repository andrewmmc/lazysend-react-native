import React from 'react'
import {StackNavigator} from 'react-navigation'
import WhatsApp from './components/WhatsApp'
import News from './components/News'

export default StackNavigator({
	Home: {
		screen: WhatsApp
	},
	News: {
		screen: News
	}
}, {
	initialRouteName: 'News'
})
