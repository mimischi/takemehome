import axios from 'axios'

const API = axios.create({
  timeout: 1000,
  baseURL: process.env.API_URL
})

export default API
