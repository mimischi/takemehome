<template lang="pug">
v-card
  v-list(two-line)
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
                    v-list-tile(@click="destroy()")
                      v-list-tile-title Delete

        v-divider(
          v-if="index + 1 < connections.length"
          :key="index"
        )

  v-dialog(
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @keydown.esc="dialog = false"
  )
    v-card
      v-toolbar(dark color="primary")
        v-btn(
          icon
          dark
          @click="dialog = false"
        )
          v-icon close

        v-toolbar-title Connection
        v-spacer
        v-toolbar-items
          v-btn(
            dark
            flat
            @click="dialog = false"
          ) Save
      // TODO: This currently renders our current ConnectionForm, but we should actually change it to a different layout.
      connection-form

  portal(to="fab")
    v-btn(
      fab
      bottom
      right
      color="primary"
      fixed
      @click="dialog = !dialog"
    )
      v-icon add
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
    sortedConnections() {
      const unsorted = this.connections.slice();
      return unsorted.sort((a, b) => {
        const x = a.isFavorite;
        const y = b.isFavorite;

        return x === y ? 0 : x ? -1 : 1;
      });
    }
  },
  components: { ConnectionModel, ConnectionForm }
};
</script>

<style>
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
