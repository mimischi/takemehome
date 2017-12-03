import axios from 'axios'

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http:proxify.dev'

const API = axios.create({
  timeout: 1000,
  baseURL: API_BASE_URL
})

export default API
