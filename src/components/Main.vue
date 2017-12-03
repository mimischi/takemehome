<template lang="pug">
  v-content
    v-layout(row)
      v-flex(xs4)
        v-subheader Enter departure station
      v-flex(xs8)
        v-select(
          label="Departure station"
          autocomplete
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          v-model="select.name"
          clearable=true
        )
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
import axios from 'axios'

const API = axios.create({
  timeout: 1000,
  baseURL: 'http://proxify.dev'
})

export default {
  name: 'Main',
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      states: [],
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
    search (val) {
      val && this.querySelections(val)
    },
    'select.name' (val) {
      const stationObj = this.stations.find(this.getExtId)
      if (typeof stationObj !== 'undefined') {
        this.select.extId = stationObj.StopLocation.extId
      } else if (typeof stationObj === 'undefined') {
        this.select.extId = null
      }
    },
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
    filterStations (stations) {
      return stations.filter(
        s => {
          if (typeof s.StopLocation !== 'undefined') {
            return s
          }
        }
      )
    },
    getExtId (item) {
      if (typeof item.StopLocation !== 'undefined') {
        return item.StopLocation.name === this.select.name
      }
    },
    querySelections (v) {
      this.loading = true
      API.post('/', {url: 'location.name', params: {input: v}}).then(response => {
        this.stations = response.data.stopLocationOrCoordLocation
        this.items = this.filterStations(this.stations).map(s => s.StopLocation.name)
        this.loading = false
      }).catch(e => {
        this.stations = e
      })
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
