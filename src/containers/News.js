// @flow
import * as React from 'react'
import { StyleSheet, Alert, FlatList, View } from 'react-native'
import type { NavigationScreenProp, NavigationStateRoute } from 'react-navigation'
import { Container, ListItem, Thumbnail, Text, Body } from 'native-base'
import NewsAPI from '../api/NewsAPI'

const PAGE_SIZE = 10
const PAGE_LIMIT = 5
const SEARCH_KEYWORD = 'WhatsApp'

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF'
  }
})

type Articles = {
  title: string,
  url: string,
  urlToImage?: string,
  description: string
}

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>
}

type State = {
  loading: boolean,
  articles: Array<Articles>,
  pageNum: number
}

export default class News extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Social Media News'
  }

  constructor (props: Props) {
    super(props)
    this.state = {
      loading: false,
      articles: [],
      pageNum: 1
    }
  }

  componentDidMount () {
    const {pageNum} = this.state
    this.getNews(pageNum)
  }

  onRefresh () {
    const nextPageNum = 1
    this.setState({pageNum: nextPageNum})
    this.getNews(nextPageNum, true)
  }

  onEndReached () {
    const {loading, pageNum} = this.state
    const nextPageNum = pageNum + 1
    if (!loading && nextPageNum <= PAGE_LIMIT) {
      this.setState({pageNum: nextPageNum})
      this.getNews(nextPageNum)
    }
  }

  async getNews (pageNum: number, refresh: boolean = false) {
    const {articles} = this.state
    this.setState({loading: true})

    try {
      const {data: {status, articles: articlesReturned}} = await NewsAPI.getNews(SEARCH_KEYWORD, pageNum, PAGE_SIZE)
      if (status === 'ok') {
        this.setState({loading: false, articles: refresh ? articlesReturned : [...articles, ...articlesReturned]})
      }
    } catch (err) {
      console.log(err)
      Alert.alert('Network Error', 'Please check your internet connection.', [{text: 'OK'}], {cancelable: false})
    }
  }

  render () {
    const {loading, articles} = this.state
    const {navigate} = this.props.navigation

    const renderItem = ({item}) => (
      <ListItem onPress={() => navigate('NewsWebView', {url: item.url, title: item.title})}>
        <Thumbnail square size={80} source={item.urlToImage ? {uri: item.urlToImage} : {}} />
        <Body>
          <Text>{item.title}</Text>
          <Text note>{item.description}</Text>
        </Body>
      </ListItem>
    )

    return (
      <Container style={styles.pageContainer}>
        <View>
          <FlatList
            data={articles}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={loading}
            onRefresh={() => { this.onRefresh() }}
            onEndReached={() => { this.onEndReached() }}
          />
        </View>
      </Container>
    )
  }
}
