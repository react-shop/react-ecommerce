import axios from 'axios'
import url from '../../api/api'

export const test = (credentials) => {
  console.log(credentials)
  return axios.post(url.dev + '/login', {
    username: credentials.username,
    password: credentials.password
  })
  .then(res => res.data)
  .catch(err => err.response.data)
}