import axios from 'axios'
import React, {Component} from 'react'
import {StyleSheet, RefreshControl, Linking} from 'react-native'
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
		this.state = {
			refreshing: false,
			articles: [],
			pageNum: 1
		}
	}

	componentDidMount() {
		this.getNews()
	}

	_onRefresh() {
		this.setState({ refreshing: true, pageNum: 1 })
		this.getNews().then(() => {
			this.setState({ refreshing: false })
		})
	}

	getNews() {
		axios.post('https://us-central1-add9u-mobile.cloudfunctions.net/get-news', {
			q: 'WhatsApp',
			pageNum: this.state.pageNum
		})
			.then((response) => {
				console.log(response)
				if (response.data.status === 'ok') {
					// this.state.articles.push(...response.data.articles)
					this.setState({ articles: [...this.state.articles, ...response.data.articles] })
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	render() {
		let articlesList = this.state.articles.map((item, index) => {
			return <ListItem key={ index }>
				<Thumbnail square size={ 80 } source={ { uri: item.urlToImage } }/>
				<Body>
				<Text>{ item.title }</Text>
				<Text note>{ item.description }</Text>
				</Body>
			</ListItem>
		})

		return (
			<Container style={ styles.pageContainer }>
				<Content>
					<List refreshControl={
						<RefreshControl
							refreshing={ this.state.refreshing }
							onRefresh={ this._onRefresh.bind(this) }
						/>
					}>
						{ articlesList }
					</List>
				</Content>
			</Container>
		)
	}
}
