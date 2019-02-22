import axios from 'axios'
import url from '../../api/api'

export const requestLogin = (credentials) => {
  return axios.post(url.dev + '/authenticate', {
    username: credentials.username,
    password: credentials.password
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}