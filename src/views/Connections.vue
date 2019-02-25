<template lang="pug">
the-card(:title="cardTitle")
  connection-list

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
</template>

<script>
import TheCard from "@/components/TheCard";
import ConnectionList from "@/components/connection/ConnectionList";

export default {
  computed: {
    cardTitle() {
      return this.$store.state.connections.length < 1
        ? "No connections found"
        : "Connections";
    }
  },
  components: { ConnectionList, TheCard }
};
</script>
