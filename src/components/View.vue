<template lang="pug">
  div
    p
      label(for="input") Enter departure station
      input(id="input" v-model="start")
      p(v-if="!stations") {{ currentStation }}
      p(v-if="stations") Selected {{ currentStation.name }} as default.
    button(@click.prevent="getDeparture" :disabled="!stations") Show departures!
    div(v-for="journey in data.Departure")
      p {{ journey.name }} (direction: {{ journey.direction }})
      p departure: {{ journey.date }} - {{ journey.time }}

</template>

<script>
import _ from 'lodash'
import axios from 'axios'

const API = axios.create({
  timeout: 1000,
  baseURL: 'http://localhost:3000'
})

export default {
  name: 'HelloWorld',
  data () {
    return {
      data: 'Nothing to show!',
      errors: [],
      start: '',
      stations: '',
      currentStation: 'Nothing to see here. Move along!'
    }
  },
  watch: {
    start () {
      this.currentStation = "You're still typing, aren't you?"
      this.getStation()
    }
  },
  methods: {
    getStation: _.debounce(
      function () {
        if (!this.start || this.start.length === 0 || !this.start.trim()) {
          this.currentStation = 'Nothing to see here. Move along!'
          return
        }
        this.stations = 'Searching...'
        API.post('/', {url: 'location.name', params: {input: this.start}}, {
        }).then(response => {
          this.stations = response.data.stopLocationOrCoordLocation
          this.currentStation = this.stations[0].StopLocation
        }).catch(e => {
          this.stations = 'Could not reach the API. ' + e
        })
      },
      500
    ),
    getDeparture () {
      if (this.data) {
        this.data = ''
      }
      API.post('/', {url: 'departureBoard', params: {extId: this.currentStation.extId}}).then(response => {
        this.data = response.data
      }).catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
