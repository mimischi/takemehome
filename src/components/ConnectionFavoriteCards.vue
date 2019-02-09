<template lang="pug">
v-item-group
  v-container(grid-list-md ma-0 pa-0)
    v-layout(row wrap)
      v-flex(
        xs12
        sm4
        v-for="connection in connections"
        :key="connection.uuid"
        class="mb-1"
      )
        v-item
          v-card(
            slot-scope="{ active, toggle }"
            :class="{ 'elevation-10': active }"
            @mouseover="toggle"
            @mouseout="toggle"
            @click="lookupConnection(connection.uuid)"
          )
            v-card-title(
              class="primary white--text py-0"
            )
              v-timeline(dense)
                v-timeline-item(
                  xs12
                  small
                  fill-dot
                  :color="active ? cardActive : cardColor"
                ) {{ connection.from.station.name }}
                v-timeline-item(
                  small
                  fill-dot
                  :color="active ? cardActive : cardColor"
                ) {{ connection.to.station.name }}
            v-card-text
              span(class="grey--text") {{ lastUsed(connection.lastUsed) }}

      v-flex(xs12 sm4)
        v-item
          v-card(
            slot-scope="{ active, toggle }"
            :class="{ 'elevation-10': active }"
            @mouseover="toggle"
            @mouseout="toggle"
            @click="addConnection()"
          )
            v-card-text(style="height: 100%")
              v-layout(align-center justify-center fill-height row)
                v-icon(style="font-size: 30px") add
                span Add connection
</template>

<script>
export default {
  name: "ConnectionFavoriteCard",
  data: () => ({
    cardColor: "grey lighten-2",
    cardActive: "green lighten-3"
  }),
  computed: {
    connections() {
      return this.$store.state.connections.filter(
        connection => connection.isFavorite === true
      );
    }
  },
  methods: {
    lookupConnection(uuid) {
      this.$router.push({ name: "connectionLookup", params: { id: uuid } });
    },
    lastUsed(date) {
      return date === null ? "Not used yet" : date;
    },
    addConnection() {
      this.$router.push({ name: "connectionCreate" });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  height: 100%;
  min-height: 200px;
}
.v-card__title {
  height: 75%;
}
@media (min-width: 600px) {
  .v-card {
    min-height: 280px;
  }
}
@media (min-width: 700px) {
  .v-card {
    min-height: 200px;
  }
}
.v-card__text,
.v-timeline {
  user-select: none;
}
.v-timeline {
  height: 100%;
  width: 100%;
}
</style>
