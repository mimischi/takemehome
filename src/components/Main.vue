<template lang="pug">
  v-content
    departure-search(v-on:madeSelection="setStation" v-on:resetSelection="resetDepartures")
    v-layout(row)
      v-btn(
        color="primary"
        @click.prevent="getDeparture"
        :disabled="!select.extId"
        ) Show departures!
    departure-list(:departures="departures")
</template>

<script>
import _ from 'lodash'
import DepartureSearch from '@/components/DepartureSearch'
import DepartureList from '@/components/DepartureList'
import API from '@/api'

export default {
  name: 'Main',
  components: {DepartureList, DepartureSearch},
  data () {
    return {
      select: {
        name: '',
        extId: null
      },
      departures: '',
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
  methods: {
    setStation (data) {
      this.select = data
    },
    resetDepartures () {
      this.departures = ''
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
        this.departures = response.data.Departure
      }).catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>
