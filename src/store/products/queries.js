import axios from 'axios'
import url from '../../api/api'

export const listProducts = () => {
  return axios.get(url.dev + '/products')
  .then(res => res.data)
  .catch(err => err.response.data)
}

export const requestProduct = (id) => {
  return axios.get(url.dev + '/products/' + id)
  .then(res => res.data)
  .catch(err => err.response.data)
}