<template lang="pug">
v-card(color="teal lighten-2" dark)
  v-card-title(class="headline teal lighten-3") {{ submitLabel }} connection
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
  v-divider
  v-card-actions
    v-spacer
    v-btn(
      :disabled="clearDisabled"
      color="teal darken-1"
      flat
      @click="cancel()"
    ) Cancel
    v-btn(
      :disabled="clearDisabled"
      color="teal darken-2"
      @click="submit()"
    ) {{ submitLabel }}
</template>

<script>
import StationSearch from "@/components/StationSearch";
import StationSearchModel from "@/components/StationSearchModel";

import { mapFields } from "vuex-map-fields";

export default {
  name: "ConnectionForm",
  components: { StationSearch, StationSearchModel },
  props: {
    entity: {
      type: String,
      default: null
    }
  },
  data: () => ({
    connection: null
  }),
  computed: {
    ...mapFields({
      connections: "connections"
    }),
    clearDisabled() {
      return (
        this.connection.from.station === null &&
        this.connection.to.station === null
      );
    },
    submitLabel() {
      return this.entity === null ? "Add" : "Update";
    }
  },
  created() {
    this.setup();
  },
  watch: {
    entity() {
      this.setup();
    }
  },
  methods: {
    setup() {
      if (this.entity === null) {
        this.connection = this.initialize();
        return;
      }

      this.connection = {
        ...this.connections.find(connection => connection.uuid === this.entity)
      };
    },
    initialize() {
      return {
        isDefault: false,
        isFavorite: false,
        provider: "RMV",
        to: {
          items: [],
          station: null
        },
        from: {
          items: [],
          station: null
        }
      };
    },
    submit() {
      if (this.entity === null) {
        this.create();
        return;
      }

      this.update();
    },
    create() {
      this.$store.dispatch("addConnection", this.connection);
      this.cancel();
    },
    update() {
      const index = this.connections.findIndex(
        connection => connection.uuid === this.entity
      );
      this.connections[index] = this.connection;
      this.$router.push({ name: "connectionList" });
    },
    cancel() {
      this.$router.push({ name: "connectionList" });
    }
  }
};
</script>
