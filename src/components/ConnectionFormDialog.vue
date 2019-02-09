<template lang="pug">
  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="close()"
  )
    connection-model(:id="id")
      v-card(slot-scope="{ data: connection, create, update, valid }")
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
        v-card-text
          station-search(
            v-model="connection.from"
            direction="from"
            label="Departure station"
          )
          station-search(
            v-model="connection.to"
            direction="to"
            label="Destination station"
          )
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
