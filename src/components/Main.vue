<template lang="pug">
  v-content
    departure-search(v-on:selectedStation="setStation")
    v-layout(row)
      v-btn(
        color="primary"
        @click.prevent="getDeparture"
        :disabled="!select.extId"
        ) Show departures!
      v-btn(
        color="error"
        @click.prevent="resetForm"
        :disabled="!select.extId"
        ) Reset
    v-list(two-line v-if="data")
      template(v-for="journey in data")
        v-list-tile(v-bind:key="journey.name" @click="")
          v-list-tile-content
            v-list-tile-title(v-html="$options.filters.formatLine(journey.name, journey.direction)")
            v-list-tile-sub-title(v-html="$options.filters.formatTime(journey.time)")
</template>

<script>
import _ from 'lodash'
import DepartureSearch from './DepartureSearch'
import API from '@/api'

export default {
  name: 'Main',
  components: {DepartureSearch},
  data () {
    return {
      select: {
        name: '',
        extId: null
      },
      data: '',
      errors: [],
      stations: []
    }
  },
  mounted () {
    this.$store.dispatch('LOAD_DEPARTURE_LIST')
  },
  watch: {
    start () {
      this.currentStation = "You're still typing, aren't you?"
      this.getStation()
    }
  },
  filters: {
    formatLine (line, direction) {
      return `${line} to ${direction}`
    },
    formatTime (time) {
      return `Departure: ${time}`
    }
  },
  methods: {
    setStation (data) {
      this.select = data
    },
    resetForm () {
      this.stations = []
      this.data = ''
      this.select = {
        extId: null,
        name: ''
      }
    },
    getStation: _.debounce(
      function () {
        if (!this.start || this.start.length === 0 || !this.start.trim()) {
          this.resetForm()
          return
        }
        this.stations = 'Searching...'
        API.post('/', {url: 'location.name', params: {input: this.start}}).then(response => {
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
      API.post('/', {url: 'departureBoard', params: {extId: this.select.extId, rtMode: 'REALTIME'}}).then(response => {
        this.data = response.data.Departure
      }).catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
