// @flow
import axios from 'axios'
import * as Url from '../utils/Url'

const getNews = (keyword: string, page: number, limit: number): Promise<Object> =>
  axios.post(Url.NEWS_URL, { q: keyword, pageNum: page, pageSize: limit })

export default { getNews }
