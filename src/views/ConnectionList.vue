<template lang="pug">
v-card
  v-card-title(class="primary lighten-2 white--text")
    h3 {{ cardTitle }}
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
            @click=""
          )
            v-list-tile-action
              v-btn(flat icon @click.prevent="toggleFavorite()")
                v-icon(v-if="connection.isFavorite") star
                v-icon(v-else) star_border

            v-list-tile-content
              v-list-tile-sub-title(class="text--primary") {{ connection.from.station.name }}
              v-list-tile-sub-title(class="text--primary") {{ connection.to.station.name }}

            v-list-tile-action(@click.stop)
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
                      @click="goToUpdate(connection.uuid, update)"
                    )
                      v-list-tile-title Edit
                    v-list-tile(@click="destroy()")
                      v-list-tile-title Delete

        v-divider(
          v-if="index + 1 < connections.length"
          :key="index"
        )

  portal(to="fab")
    v-btn(
      bottom
      right
      color="primary"
      fixed
      fab
      :to="{ name: 'connectionCreate' }"
    )
      v-icon(
        class="fab-v-icon"
      ) add

  router-view
</template>

<script>
import ConnectionForm from "@/components/ConnectionForm";
import ConnectionModel from "@/components/ConnectionModel";
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
  components: { ConnectionModel, ConnectionForm },
  methods: {
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
