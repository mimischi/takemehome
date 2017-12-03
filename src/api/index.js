import axios from 'axios'

const API = axios.create({
  timeout: 1000,
  baseURL: 'http://proxify.dev'
})

export default API
