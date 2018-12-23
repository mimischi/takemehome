<template lang="pug">
v-card(color="teal lighten-2" dark)
  v-card-title(class="headline teal lighten-3") Station selection
    v-card-text
      search-station(
        v-model="connection.from"
        direction="from"
        label="Departure station"
        prepend-icon="trending_up"
      )
      search-station(
        v-model="connection.to"
        direction="to"
        label="Destination station"
        prepend-icon="trending_down"
      )
  v-divider
  v-card-actions
    v-spacer
    v-btn(
      :disabled="clearDisabled"
      color="teal darken-1"
      @click="submit()"
    )
      | {{ submitLabel }}
      v-icon(right) add
    v-btn(
      :disabled="clearDisabled"
      color="teal darken-1"
      @click="clear()"
    )
      | Clear
      v-icon(right) close
</template>

<script>
import SearchStation from "@/components/SearchStation";
import StationSearchModel from "@/components/StationSearchModel";

import { mapFields } from "vuex-map-fields";

export default {
  name: "SearchStations",
  components: { SearchStation, StationSearchModel },
  props: {
    entity: {
      type: Number,
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
      return this.entity === null ? "Add connection" : "Update connection";
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

      this.connection = { ...this.connections[this.entity] };
    },
    initialize() {
      return {
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
      this.clear();
    },
    update() {
      this.connections[this.entity] = this.connection;
    },
    clear() {
      this.connection = this.initialize();
    }
  }
};
</script>
