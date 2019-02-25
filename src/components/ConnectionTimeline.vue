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
    v-container
      v-flex(xs10) {{ trip }}
    v-spacer
    v-tooltip(left :disabled="loading")
      template(#activator="data")
        v-btn(
          icon
          v-on="data.on"
          @click="getTrip()"
          :disabled="loading"
        )
          v-icon autorenew
      span Reload connection
    v-tooltip(left :disabled="loading")
      template(#activator="data")
        v-btn(
          icon
          v-on="data.on"
          @click="reverseLookup()"
          :disabled="loading"
        )
          v-icon swap_vert
      span Perform reverse lookup
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
    },
    reverse: {
      type: String,
      default: null
    }
  },
  data: () => ({
    trips: null,
    offsetTop: 0,
    connectionData: null,
    loading: false
  }),
  computed: {
    connection() {
      const connection = this.$store.state.connections.find(
        connection => connection.uuid === this.id
      );
      return connection;
    },
    trip() {
      return `${this.connectionData.from.station.name} - 
      ${this.connectionData.to.station.name}`;
    }
  },
  created() {
    // Do nothing if we cannot lookup the connection UUID.
    if (!this.connection) return;

    // Determine in which direction to lookup the connections.
    this.connectionData = {
      from: this.connection.from,
      to: this.connection.to
    };

    if (!!this.reverse && this.reverse === "reverse") {
      this.revertConnection();
    }

    this.getTrip();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  methods: {
    revertConnection() {
      [this.connectionData.from, this.connectionData.to] = [
        this.connectionData.to,
        this.connectionData.from
      ];
    },
    reverseLookup() {
      let reverse = this.$route.params.reverse;
      reverse = !reverse ? "reverse" : null;

      this.$router.push({
        name: "connectionLookup",
        params: { id: this.id, reverse: reverse }
      });

      this.revertConnection();
      this.getTrip();
    },
    scrollToTop() {
      this.$vuetify.goTo("#app");
    },
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop;
    },
    getTrip() {
      this.trips = null;
      this.loading = true;

      axios
        .post(process.env.VUE_APP_API_URL, {
          url: "trip",
          params: {
            originExtId: this.connectionData.from.station.extId,
            destExtId: this.connectionData.to.station.extId
          }
        })
        .then(response => {
          this.trips = response.data.Trip;
        })
        .catch(e => {
          this.errors = 'Something went wrong with the API: "' + e + '".';
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
