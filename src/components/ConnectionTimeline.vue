<template lang="pug">
//- v-layout(row wrap v-scroll="onScroll")
//-   v-flex(xs12)
//-     v-card(v-if="connection === null")
//-       v-card-title(class="primary lighten-2 white--text")
//-         h3 Add your first connection
//-       v-card-text
//-         v-layout(align-center justify-space-around)
//-           v-icon(
//-             large
//-             color="primary"
//-             ) commute
//-           span You have not added any connections yet. <br /> Add at least one to perform searches.

the-card(
  :title="trip"
  :noTitle=`true`
  :backLink="{ name: 'connectionList' }"
  v-scroll="onScroll"
)
  template(v-slot:rightSide)
    v-container {{ trip }}
  v-container
    div#timeline
      timeline-skeleton(v-if="trips === null")
      timeline(
        v-if="trips"
        v-for="trip in trips"
        :trip="trip"
        :key="trip.idx"
        )

  portal(to="fab")
    v-fab-transition
      v-btn(
        color="red"
        dark
        large
        bottom
        right
        fab
        fixed
        v-show="offsetTop > 300"
        @click="scrollToTop"
      )
        v-icon keyboard_arrow_up
</template>

<script>
import axios from "axios";
import TheCard from "@/components/TheCard";
import Timeline from "@/components/timeline/Timeline";
import TimelineSkeleton from "@/components/timeline/TimelineSkeleton";
import WelcomeCard from "@/components/WelcomeCard";

export default {
  name: "ConnectionTimeline",
  components: { Timeline, TimelineSkeleton, TheCard, WelcomeCard },
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
    trips: null,
    offsetTop: 0
  }),
  computed: {
    connection() {
      const connection = this.$store.state.connections.find(
        connection => connection.uuid === this.id
      );
      return connection;
    },
    trip() {
      return `${this.connection.from.station.name} - 
      ${this.connection.to.station.name}`;
    }
  },
  mounted() {
    // Do nothing if we cannot lookup the connection UUID.
    if (!this.connection) return;

    this.getTrip();
  },
  methods: {
    scrollToTop() {
      this.$vuetify.goTo("#app");
    },
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    },
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
