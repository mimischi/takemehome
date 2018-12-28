<template lang="pug">
v-card
  v-list(two-line)
    transition-group(name="list" tag="div")
      template(v-for="(connection, index) in connections")
        station-model(:id="index" :key="connection.uuid")
          v-list-tile(
            slot-scope="{ update: update, makeDefault, destroy }"
            class="list-connection"
            ripple
            @click=""
          )
            v-list-tile-action
              v-btn(flat icon)
                v-icon(v-if="index === 0") star
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

        v-divider(
          v-if="index + 1 < connections.length"
          :key="index"
        )
</template>

<script>
import StationModel from "@/components/StationModel";
import { mapFields } from "vuex-map-fields";

export default {
  computed: {
    ...mapFields(["connections"])
  },
  components: { StationModel }
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
