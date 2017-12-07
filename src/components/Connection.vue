<template lang="pug">
  v-content
    departure-search(
      label="What place do you want to leave?"
      icon="flight_takeoff"
      v-on:madeSelection="setDepartureStation"
      v-on:resetSelection="resetDepartureStation"
      )
    departure-search(
      label="What is your destination?"
      icon="flight_land"
      v-on:madeSelection="setDestinationStation"
      v-on:resetSelection="resetDestinationStation"
    )
    v-btn(color="primary" block large @click="getTrip" :loading="loading" :disabled="disabled") TAKE.ME.HOME
    v-alert(color="error" icon="warning" :value="errors" v-model="alert" dismissible transition="scale-transition") {{ errors }}
    timeline-skeleton(v-if="showSkeleton")
    timeline(v-if="trips" v-for="trip in trips" :trip="trip" :key="trip.tripId")
</template>

<script>
import API from '@/api'
import DepartureSearch from '@/components/departures/DepartureSearch'
import Timeline from '@/components/timeline/Timeline'
import TimelineSkeleton from '@/components/timeline/TimelineSkeleton'

export default {
  name: 'Connection',
  components: {
    DepartureSearch,
    Timeline,
    TimelineSkeleton
  },
  data () {
    return {
      loading: false,
      dialog: false,
      alert: false,
      disabled: false,
      errors: null,
      stations: {
        start: {
          name: '',
          extId: null
        },
        end: {
          name: '',
          extId: null
        }
      },
      trips: null
    }
  },
  watch: {
    'stations.start' (value) {
      this.toggleSubmitButton()
    },
    'stations.end' (value) {
      this.toggleSubmitButton()
    }
  },
  mounted () {
    this.toggleSubmitButton()
  },
  computed: {
    showSkeleton () {
      return (!this.trip && this.loading)
    }
  },
  methods: {
    toggleSubmitButton () {
      if (this.stations.start.extId === null || this.stations.end.extId === null) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    },
    setDepartureStation (data) {
      this.stations.start = data
    },
    resetDepartureStation () {
      this.stations.start = {
        extId: null,
        name: ''
      }
    },
    setDestinationStation (data) {
      this.stations.end = data
    },
    resetDestinationStation () {
      this.stations.end = {
        extId: null,
        name: ''
      }
    },
    getTrip () {
      this.loading = true
      this.disabled = true
      this.trips = null
      this.errors = null
      this.alert = false
      API.post(
        '/',
        {
          url: 'trip',
          params: {
            originExtId: this.stations.start.extId,
            destExtId: this.stations.end.extId
          }
        }
      ).then(response => {
        this.loading = false
        this.disabled = false
        this.trips = response.data.Trip
      }).catch(e => {
        this.loading = false
        this.disabled = false
        this.alert = true
        this.errors = 'Something went wrong with the API: "' + e + '".'
      })
    }
  }
}
</script>
