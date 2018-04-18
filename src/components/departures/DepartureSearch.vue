<template lang="pug">
  v-layout(row)
      v-flex(xs12)
        v-select(
          :label="label"
          :prepend-icon="icon"
          autocomplete
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          item-text="name"
          item-value="extId"
          v-model="select"
          return-object
        )
</template>

<script>
import API from '@/api'

export default {
  name: 'DepartureSearch',
  props: ['stationSelect', 'label', 'icon', 'initialItems', 'identity'],
  data () {
    return {
      loading: false,
      search: null,
      stations: []
    }
  },
  computed: {
    items: {
      get () {
        return this.$store.state.items[this.identity]
      },
      set (value) {
        this.$store.dispatch('SET_ITEMS', {
          identity: this.identity,
          items: value
        })
      }
    },
    select: {
      get () {
        return this.$store.state.stations[this.identity]
      },
      set (value) {
        this.$store.dispatch('SET_STATIONS', {
          identity: this.identity,
          station: value
        })
      }
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
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
        this.items = this.filterStations(this.stations).map(
          s => ({
            name: s.StopLocation.name,
            extId: s.StopLocation.extId
          })
        )
        this.loading = false
      }).catch(e => {
        this.stations = e
      })
    }
  }
}
</script>

