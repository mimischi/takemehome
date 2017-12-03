<template lang="pug">
  v-list(two-line v-if="departures")
    template(v-for="journey in departures")
      v-list-tile(v-bind:key="journey.name" @click="")
        v-list-tile-content
          v-list-tile-title(v-html="$options.filters.formatLine(journey.name, journey.direction)")
          v-list-tile-sub-title(v-html="$options.filters.formatTime(journey.time)")
</template>

<script>
export default {
  name: 'DepartureList',
  props: ['departures'],
  data () {
    return {
      data: this.departures || []
    }
  },
  filters: {
    formatLine (line, direction) {
      return `${line} to ${direction}`
    },
    formatTime (time) {
      return `Departure: ${time}`
    }
  }
}
</script>

