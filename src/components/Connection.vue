<template lang="pug">
  v-content
    //- v-dialog(v-model="dialog" persistent max-width="500px")
    //-   v-btn(color="secondary" dark slot="activator") Change settings
    //-   v-card
    //-     v-card-title
    //-       span.headline TAKE.ME.HOME settings
    //-     v-card-text
    //-       v-container(grid-list-md)
    //-         v-layout(wrap)
    //-           v-flex(xs12)
    //-             v-text-field(
    //-               name="startStation"
    //-               label="What place do you want to leave?"
    //-               v-model="stations.start.name"
    //-               prepend-icon="flight_takeoff"
    //-               readonly
    //-             )
    //-             v-text-field(
    //-               name="endStation"
    //-               label="What is your destination?"
    //-               v-model="stations.end.name"
    //-               prepend-icon="flight_land"
    //-               readonly
    //-             )
    //-     v-card-actions
    //-       v-spacer
    //-       v-btn(color="blue darken-1" flat @click="dialog = false") Save
    //-       v-btn(color="blue darken-1" flat @click.native="dialog = false") Close
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
    v-btn(color="primary" block large @click="getTrip" :loading="loading" :disabled="loading") TAKE.ME.HOME
    v-alert(color="error" icon="warning" :value="errors" v-model="alert" dismissible transition="scale-transition") {{ errors }}
    timeline(v-if="trips" v-for="trip in trips" :trip="trip" :key="trip.tripId")
</template>

<script>
import API from '@/api'
import DepartureSearch from '@/components/departures/DepartureSearch'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'Connection',
  components: {
    DepartureSearch,
    Timeline
  },
  data () {
    return {
      loading: false,
      dialog: false,
      alert: false,
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
  methods: {
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
        this.trips = response.data.Trip
      }).catch(e => {
        this.loading = false
        this.alert = true
        this.errors = 'Something went wrong with the API: "' + e + '".'
      })
    }
  }
}
</script>
