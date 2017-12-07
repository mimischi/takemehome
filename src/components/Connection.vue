<template lang="pug">
  v-content
    v-flex(xs12)
      v-text-field(
        name="startStation"
        label="What place do you want to leave?"
        v-model="stations.start.name"
        prepend-icon="flight_takeoff"
        readonly
      )
      v-text-field(
        name="endStation"
        label="What is your destination?"
        v-model="stations.end.name"
        prepend-icon="flight_land"
        readonly
      )
    v-btn(color="primary" block large @click="getTrip" :loading="loading" :disabled="loading") TAKE.ME.HOME
    v-alert(color="error" icon="warning" :value="errors" v-model="alert" dismissible transition="scale-transition") {{ errors }}
    timeline(v-if="trips" v-for="trip in trips" :trip="trip" :key="trip.tripId")
    //- v-list(two-line v-if="trips")
    //-   template(v-for="leg in trips")
    //-     v-list-tile(v-if="leg.LegList.Leg.length > 1")
    //-     v-list-tile(v-bind:key="leg.LegList.Leg.Origin" @click="")
    //-       v-list-tile-content
    //-         v-list-tile-title {{ leg.LegList.Leg[0].Origin.name }}
    //-         v-list-tile-sub-title {{ leg.LegList.Leg[0].Destination.name }}
</template>

<script>
import API from '@/api'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'Connection',
  components: {Timeline},
  data () {
    return {
      loading: false,
      dialog: false,
      alert: false,
      errors: null,
      stations: {
        start: {
          name: 'Frankfurt (Main) Uni Campus Riedberg',
          extId: '003060765'
        },
        end: {
          // name: 'Frankfurt (Main) Heddernheim',
          // extId: '003001317'
          // name: 'Frankfurt (Main) Hauptbahnhof',
          // extId: '003000010'
          extId: '003001201',
          name: 'Frankfurt (Main) Bockenheimer Warte'
        }
      },
      trips: null
    }
  },
  computed: {
    bla (index) {
      return index % 2
    },
    invertTest () {
      this.test = !this.test
      return this.test
    }
  },
  methods: {
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
