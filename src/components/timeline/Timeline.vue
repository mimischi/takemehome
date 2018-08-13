<template lang="pug">
  div#timeline
    timeline-skeleton(v-if="showSkeleton")
    timeline-item(
      v-if="trips"
      v-for="trip in trips"
      :trip="trip"
      :key="trip.tripId"
      )
</template>

<script>
import TimelineSkeleton from '@/components/timeline/TimelineSkeleton'
import TimelineItem from '@/components/timeline/TimelineItem'

export default {
  name: 'Timeline',
  props: ['trips'],
  components: { TimelineSkeleton, TimelineItem },
  computed: {
    showSkeleton () {
      return !this.trip && this.$store.state.loading
    }
  }
}
</script>
