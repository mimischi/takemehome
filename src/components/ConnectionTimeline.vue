<template lang="pug">
v-layout(row wrap)
  transition(name="slide-x-transition")
    v-flex(
      xs12
      v-if="$store.state.showWelcome"
      class="mb-3"
    )
      welcome-card

  v-flex(xs12)
    v-card(v-if="connection === null")
      v-card-title(class="primary lighten-2 white--text")
        h3 Add your first connection
      v-card-text
        v-layout(align-center justify-space-around)
          v-icon(
            large
            color="primary"
            ) commute
          span You have not added any connections yet. <br /> Add at least one to perform searches.
    div#timeline(v-else)
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
import WelcomeCard from "@/components/WelcomeCard";

export default {
  name: "ConnectionTimeline",
  components: { Timeline, TimelineSkeleton, WelcomeCard },
  props: {
    data: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    trips: null
  }),
  computed: {
    connection() {
      const connection = this.$store.state.connections.find(
        connection => connection.uuid === this.id
      );
      return connection;
    }
  },
  mounted() {
    // Do nothing if we cannot lookup the connection UUID.
    if (!this.connection) return;

    this.getTrip();
  },
  methods: {
    getTrip() {
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
