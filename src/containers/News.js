// @flow
import axios from 'axios'
import * as React from 'react'
import { StyleSheet, Alert, FlatList, View } from 'react-native'
import type { NavigationScreenProp, NavigationStateRoute } from 'react-navigation'
import { Container, ListItem, Thumbnail, Text, Body } from 'native-base'

const PAGE_SIZE = 10
const PAGE_LIMIT = 5
const SEARCH_URL = 'https://us-central1-add9u-mobile.cloudfunctions.net/get-news'
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
    // TODO: Known bug - Still keep old articles when refreshing in some cases, because of setState cycle
    // https://reactjs.org/docs/react-component.html#setstate
    this.setState({pageNum: nextPageNum, articles: []},
      this.getNews(nextPageNum))
  }

  onEndReached () {
    const {loading, pageNum} = this.state
    const nextPageNum = pageNum + 1
    if (!loading && nextPageNum <= PAGE_LIMIT) {
      this.setState({pageNum: nextPageNum},
        this.getNews(nextPageNum))
    }
  }

  getNews (pageNum: number) {
    const {articles} = this.state

    this.setState({loading: true})
    axios.post(SEARCH_URL, {
      q: SEARCH_KEYWORD,
      pageNum,
      pageSize: PAGE_SIZE
    })
      .then((response) => {
        const {data: {status, articles: articlesReturned}} = response
        if (status === 'ok') {
          this.setState({loading: false, articles: [...articles, ...articlesReturned]})
        }
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Network Error', 'Please check your internet connection.', [{text: 'OK'}], {cancelable: false})
      })
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
            onEndReachedThreshold={0.1}
            onEndReached={() => { this.onEndReached() }}
          />
        </View>
      </Container>
    )
  }
}
