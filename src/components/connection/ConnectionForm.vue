<template lang="pug">
connection-model(:id="id")
  v-card(slot-scope="{ data: connection, create, update, swap, valid }")
    v-layout(justify-center)
      v-flex(xs12 md8 lg6)
        v-card-title
          span.subheading Departure and destination
        v-card-text
          v-layout(row)
            v-flex(xs11)
              station-search(
                v-model="connection.from"
                :autofocus=`true`,
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

        v-card-actions
          v-btn(
            flat
            @click="close()"
          ) Cancel
          v-spacer
          v-btn(
            color="primary"
            @click="submit({ create: create, update: update })"
            :disabled="!valid"
          ) Save
</template>

<script>
import ConnectionModel from "@/components/connection/ConnectionModel";
import StationSearch from "@/components/connection/StationSearch";

export default {
  name: "ConnectionFormDialog",
  components: { ConnectionModel, StationSearch },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    label() {
      return this.id === null ? "Add" : "Update";
    }
  },
  methods: {
    close() {
      this.$router.push({ name: "connectionList" });
    },
    submit(callback) {
      this.id === null ? callback.create() : callback.update();

      this.close();
    }
  }
};
</script>
