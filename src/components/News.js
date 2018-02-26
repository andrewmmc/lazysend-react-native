import React, {Component} from 'react'
import {StyleSheet, Linking} from 'react-native'
import {Container, Header, Content, List, ListItem, Thumbnail, Text, Body} from 'native-base'

const styles = StyleSheet.create({
	'pageContainer': {
		backgroundColor: '#FFFFFF'
	}
})

export default class News extends Component {
	static navigationOptions = {
		title: 'News'
	}

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Container style={ styles.pageContainer }>
				<Content>
					<List>
						<ListItem>
							<Thumbnail square size={ 80 } source={ { uri: '' } }/>
							<Body>
							<Text>Sankhadeep</Text>
							<Text note>Its time to build a difference.</Text>
							</Body>
						</ListItem>
					</List>
				</Content>
			</Container>
		)
	}
}
