<template lang="pug">
v-card
  v-container(
    fluid
    grid-list-lg
  )
    h2(class="headline mb-0") Connections
    v-layout(
      row
      wrap
      v-for="(connection, index) in connections"
      :key="connection.id"     
      )
      v-flex(xs12)
        station-model(:id="index")
          v-card(slot-scope="{ update: update, makeDefault, destroy }")
            v-card-title(primary-title)
              div
                h3(class="mb-0") {{ connection.from.station.name }} - {{ connection.to.station.name }} 
            v-card-actions
              v-btn(
                flat
                :disabled="index === 0"
                @click="makeDefault()"
              ) Make primary
              v-btn(
                flat
                color="orange"
                @click="goToUpdate(index, update)"
              ) Edit
              v-btn(
                flat
                color="orange"
                @click="destroy()"
              ) Delete
</template>

<script>
import StationModel from "@/components/StationModel";
import { mapFields } from "vuex-map-fields";

export default {
  name: "StationManager",
  components: { StationModel },
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
