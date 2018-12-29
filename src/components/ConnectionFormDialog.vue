<template lang="pug">
  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="close()"
  )
    v-card
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
            @click="submit()"
          ) Save
      v-card-text
        search-station(
          v-model="connection.from"
          direction="from"
          label="Departure station"
        )
        search-station(
          v-model="connection.to"
          direction="to"
          label="Destination station"
        )
</template>

<script>
import SearchStation from "@/components/SearchStation";
import ConnectionForm from "@/components/ConnectionForm";

import { mapFields } from "vuex-map-fields";

export default {
  name: "ConnectionFormDialog",
  components: { ConnectionForm, SearchStation },
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    dialog: false,
    connection: null
  }),
  computed: {
    ...mapFields({
      connections: "connections"
    }),
    label() {
      return this.id === null ? "Add" : "Update";
    }
  },
  watch: {
    id() {
      this.setup();
    }
  },
  beforeRouteLeave(to, from, next) {
    this.dialog = false;

    // This is a nasty hack. I couldn't think of any other working solution. I
    // do not know if the timing is alright, but as of today the transition
    // seems to be finished when we change the route.
    setTimeout(() => {
      next();
    }, 300);
  },
  created() {
    this.setup();
  },
  mounted() {
    this.dialog = true;
  },
  methods: {
    setup() {
      if (this.id === null) {
        this.connection = this.initialize();
        return;
      }

      this.connection = {
        ...this.connections.find(connection => connection.uuid === this.id)
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
    close() {
      this.$router.push({ name: "connectionList" });
    },
    submit() {
      if (this.id === null) {
        this.create();
        return;
      }

      this.update();
    },
    create() {
      this.$store.dispatch("addConnection", this.connection);

      this.close();
    },
    update() {
      const index = this.connections.findIndex(
        connection => connection.uuid === this.id
      );
      this.connections[index] = this.connection;

      this.close();
    }
  }
};
</script>
