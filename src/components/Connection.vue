<template lang="pug">
  v-content
    departure-search(
      :stationSelect="stations.start"
      :initialItems="items.start"
      identity="departure"
      label="What place do you want to leave?"
      icon="flight_takeoff"
      )
    departure-search(
      :stationSelect="stations.end"
      :initialItems="items.end"
      identity="destination"
      label="What is your destination?"
      icon="flight_land"
    )
    v-switch(
      v-bind:label="`Remember connection`"
      v-model="saveSelection"
      )
    v-switch(
      v-bind:label="`Auto-Retrieve on next visit`"
      v-model="autoRetrieve"
      :disabled="!saveSelection"
      )
    v-layout(row)
      v-flex(xs4)
        v-btn(
          color="yellow"
          @click="resetForm"
          large
          ) RESET.ME.NOW
      v-flex(xs8)
        v-btn(
          color="primary"
          @click="getTrip"
          block
          large
          :loading="loading"
          :disabled="buttonDisabled"
          ) TAKE.ME.HOME
    v-alert(
      color="error"
      icon="warning"
      :value="errors"
      v-model="alert"
      dismissible
      transition="scale-transition"
      ) {{ errors }}
    timeline-skeleton(v-if="showSkeleton")
    timeline(
      v-if="trips"
      v-for="trip in trips"
      :trip="trip"
      :key="trip.tripId"
      )
</template>

<script>
import { mapGetters } from 'vuex'

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
  mounted () {
    // setTimeout(() => {
    //   if (this.$store.state.autoRetrieve) {
    //     this.getTrip()
    //   }
    // }, 1000)
  },
  data () {
    return {
      loading: false,
      takemehome: false,
      dialog: false,
      alert: false,
      disabled: true,
      errors: null,
      search: {
        start: null,
        end: null
      },
      trips: null
    }
  },

  computed: {
    ...mapGetters([
      'items',
      'stations',
      'stationValid'
    ]),
    showSkeleton () {
      return (!this.trip && this.loading)
    },
    buttonDisabled () {
      return this.stationValid || this.takemehome
    },
    saveSelection: {
      get () {
        return this.$store.state.saveSelection
      },
      set (value) {
        this.$store.dispatch('TOGGLE_SAVE_SELECTION')
      }
    },
    autoRetrieve: {
      get () {
        return this.$store.state.autoRetrieve
      },
      set (value) {
        this.$store.dispatch('TOGGLE_AUTO_RETRIEVE')
      }
    }
  },
  methods: {
    resetForm () {
      this.$store.dispatch('RESET_FORM')
    },
    getTrip () {
      this.loading = true
      this.takemehome = true
      this.trips = null
      this.errors = null
      this.alert = false
      API.post(
        '/',
        {
          url: 'trip',
          params: {
            originExtId: this.stations.departure.extId,
            destExtId: this.stations.destination.extId
          }
        }
      ).then(response => {
        this.loading = false
        this.takemehome = false
        this.trips = response.data.Trip
      }).catch(e => {
        this.loading = false
        this.takemehome = false
        this.alert = true
        this.errors = 'Something went wrong with the API: "' + e + '".'
      })
    }
  }
}
</script>
