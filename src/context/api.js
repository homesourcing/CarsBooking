import axios from 'axios'

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

client.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

export default client
