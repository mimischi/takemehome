<template lang="pug">
div#timeline
  timeline-skeleton(v-if="showSkeleton")
  timeline(
    v-if="trips"
    v-for="trip in trips"
    :trip="trip"
    :key="trip.tripId"
    )
</template>

<script>
import Timeline from "@/components/timeline/Timeline";
import TimelineSkeleton from "@/components/timeline/TimelineSkeleton";

export default {
  name: "ConnectionTimeline",
  components: { Timeline, TimelineSkeleton },
  data: () => ({
    showSkeleton: true
  })
};
</script>
