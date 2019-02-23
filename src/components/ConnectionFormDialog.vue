<template lang="pug">
  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="close()"
  )
    connection-model(:id="id")
      v-card(slot-scope="{ data: connection, create, update, swap, valid }")
        v-toolbar(dark color="primary")
          v-btn(
            icon
            dark
            @click="close()"
          )
            v-icon close

          v-toolbar-title {{ label }} connection
          v-spacer
          v-toolbar-items
            v-btn(
              dark
              flat
              @click="submit({ create: create, update: update })"
              :disabled="!valid"
            ) Save

        v-layout(justify-center)
          v-flex(xs12 md6 lg5)
            v-card-title
              span.subheading Departure and destination
            v-card-text
              v-layout(row)
                v-flex(xs11)
                  station-search(
                    v-model="connection.from"
                    direction="from"
                    label="Departure station"
                    prepend-icon="flight_takeoff"
                    hint="Choose your departure station"
                  )
                  station-search(
                    v-model="connection.to"
                    direction="to"
                    label="Destination station"
                    prepend-icon="flight_land"
                    hint="Choose your destination station"
                  )
                v-flex(xs1)
                  v-layout(xs1 align-center justify-center fill-height)
                    v-btn(
                      icon
                      :disabled="!valid"
                      @click="swap()"
                    )
                      v-icon swap_vert
            v-card-title
              span.subheading Connection settings
            v-card-text
              v-switch(
                v-model="connection.isFavorite"
                label="Mark connection as favorite?"
                :prepend-icon="connection.isFavorite ? 'star' : 'star_border'"
              ) Favorite
</template>

<script>
import ConnectionForm from "@/components/ConnectionForm";
import ConnectionModel from "@/components/ConnectionModel";
import StationSearch from "@/components/StationSearch";

export default {
  name: "ConnectionFormDialog",
  components: { ConnectionForm, ConnectionModel, StationSearch },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    dialog: false
  }),
  computed: {
    label() {
      return this.id === null ? "Add" : "Update";
    }
  },
  beforeRouteLeave(to, from, next) {
    this.dialog = false;

    // This is a nasty hack. I couldn't think of any other working solution. I
    // do not know if the timing is alright, but as of today the transition
    // seems to be finished when we change the route.
    setTimeout(() => {
      next();
    }, 100);
  },
  mounted() {
    this.dialog = true;
  },
  methods: {
    close() {
      this.$router.go(-1);
      // this.$router.push({ name: "connectionList" });
    },
    submit(callback) {
      this.id === null ? callback.create() : callback.update();

      this.close();
    }
  }
};
</script>
