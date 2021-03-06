<template lang="pug">
v-card-text(v-if="connections.length < 1")
  v-layout(align-center justify-space-around)
    v-icon(
      large
      color="primary"
      ) train
    span There are no connections to show.
v-list(
  v-else
  two-line
)
  transition-group(name="list" tag="div")
    template(v-for="(connection, index) in sortedConnections")
      connection-model(:id="connection.uuid" :key="connection.uuid")
        v-list-tile(
          slot-scope="{ update: update, makeDefault, destroy, toggleFavorite }"
          class="list-connection"
          ripple
          @click="lookupConnection(connection.uuid)"
        )
          v-list-tile-action(@click.stop @mousedown.stop)
            v-btn(flat icon @click.prevent="toggleFavorite()")
              v-icon(v-if="connection.isFavorite") star
              v-icon(v-else) star_border

          v-list-tile-content
            v-list-tile-sub-title(class="text--primary") {{ connection.from.station.name }}
            v-list-tile-sub-title(class="text--primary") {{ connection.to.station.name }}

          v-list-tile-action(@click.stop @mousedown.stop)
            v-list-tile-action-text
              v-menu(bottom left)
                v-btn(
                  slot="activator"
                  icon
                )
                  v-icon more_vert

                v-list
                  v-list-tile(
                    v-if="index ===0"
                    disabled
                  )
                    v-list-tile-title Already primary
                  v-list-tile(
                    v-else
                    @click="makeDefault()")
                    v-list-tile-title Make primary
                  v-list-tile(
                    @click="lookupConnection(connection.uuid, 'reverse')"
                  )
                    v-list-tile-title Reverse lookup
                  v-list-tile(
                    @click="goToUpdate(connection.uuid, update)"
                  )
                    v-list-tile-title Edit
                  v-list-tile(@click="destroy()")
                    v-list-tile-title Delete

      v-divider(
        v-if="index + 1 < connections.length"
        :key="index"
      )
</template>

<script>
import ConnectionModel from "@/components/connection/ConnectionModel";
import { mapFields } from "vuex-map-fields";

export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapFields(["connections"]),
    cardTitle() {
      return this.connections.length < 1
        ? "No connections found"
        : "Connections";
    },
    sortedConnections() {
      const unsorted = this.connections.slice();
      return unsorted.sort((a, b) => {
        const x = a.isFavorite;
        const y = b.isFavorite;

        return x === y ? 0 : x ? -1 : 1;
      });
    }
  },
  components: { ConnectionModel },
  methods: {
    lookupConnection(uuid, reverse = null) {
      this.$router.push({
        name: "connectionLookup",
        params: { id: uuid, reverse: reverse }
      });
    },
    goToUpdate(index, callback) {
      callback();
      this.$router.push({ name: "connectionEdit", params: { id: index } });
    }
  }
};
</script>

<style>
.fab-v-icon {
  display: inline-flex !important;
}

.list-connection {
  transition: all 0.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
.list-leave-active {
  position: relative;
}
</style>
