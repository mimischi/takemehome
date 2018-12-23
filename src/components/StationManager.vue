<template lang="pug">
v-card
  v-container(
    fluid
    grid-list-lg
  )
    h2(class="headline mb-0") Connections
    transition-group(name="flip-list" tag="div")
      v-layout(
        row
        wrap
        v-for="(connection, index) in connections"
        :key="connection.uuid"     
        )
        v-flex(xs12)
          station-model(:id="index")
            v-card(slot-scope="{ update: update, makeDefault, destroy }")
              v-card-title(primary-title)
                div
                  h3(class="mb-0") {{ connection.from.station.name }} - {{ connection.to.station.name }} 
              v-card-actions
                v-spacer
                v-btn(
                  v-if="index === 0"
                  disabled
                )
                  | Primary
                  v-icon(right dark) check_circle
                v-btn(
                  v-else
                  flat
                  @click="makeDefault()"
                ) Make primary
                v-btn(
                  icon
                  @click="goToUpdate(index, update)"
                )
                  v-icon edit
                v-btn(
                  icon
                  @click="destroy()"
                )
                  v-icon delete
</template>

<script>
import StationModel from "@/components/StationModel";
import { mapFields } from "vuex-map-fields";

export default {
  name: "StationManager",
  components: { StationModel },
  data: () => ({}),
  computed: {
    ...mapFields(["connections"])
  },
  methods: {
    goToUpdate(index, callback) {
      callback();
      this.$router.push({ name: "editConnection", params: { id: index } });
    }
  }
};
</script>

<style>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
