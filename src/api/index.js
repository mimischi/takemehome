import axios from 'axios'
import localforage from 'localforage'

export const API = axios.create({
  timeout: 10000,
  baseURL: process.env.API_URL
})

export const loadStations = () => {
  return localforage.getItem('stations').then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const loadItems = () => {
  return localforage.getItem('items').then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const setStations = (stations) => {
  return localforage.setItem(
    'stations', stations
  ).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export const setItems = (items) => {
  return localforage.setItem(
    'items', items
  ).then((value) => {
    return value
  }).catch((err) => {
    return err
  })
}

export default API
