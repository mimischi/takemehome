<template lang="pug">
div#timeline
  timeline-skeleton(v-if="trips === null")
  timeline(
    v-if="trips"
    v-for="trip in trips"
    :trip="trip"
    :key="trip.idx"
    )
</template>

<script>
import axios from "axios";
import Timeline from "@/components/timeline/Timeline";
import TimelineSkeleton from "@/components/timeline/TimelineSkeleton";

export default {
  name: "ConnectionTimeline",
  components: { Timeline, TimelineSkeleton },
  data: () => ({
    trips: null
  }),
  computed: {
    connection() {
      return this.$store.state.connections[0];
    }
  },
  mounted() {
    this.getTrip();
  },
  methods: {
    getTrip() {
      console.log("Called getTrip()");
      axios
        .post(process.env.VUE_APP_API_URL, {
          url: "trip",
          params: {
            originExtId: this.connection.from.station.extId,
            destExtId: this.connection.to.station.extId
          }
        })
        .then(response => {
          this.trips = response.data.Trip;
        })
        .catch(e => {
          this.errors = 'Something went wrong with the API: "' + e + '".';
        });
    }
  }
};
</script>
