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
          clearable=true
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
        this.$store.dispatch('SET_ITEM_LIST', {
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
        this.$store.dispatch('SET_STATION_LIST', {
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
    // 'select.name' (val) {
    //   const stationObj = this.stations.find(this.getExtId)
    //   if (typeof stationObj !== 'undefined') {
    //     // this.select.extId = stationObj.StopLocation.extId

    //     this.$store.dispatch('SET_STATION_LIST', { [this.identity]: val })
    //     // this.$emit('madeSelection', {
    //     //   station: this.select,
    //     //   items: this.items,
    //     //   search: this.search
    //     // })
    //   } else if (typeof stationObj === 'undefined') {
    //     // this.select.extId = null

    //     // this.$emit('resetSelection')
    //   }
    // }
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

