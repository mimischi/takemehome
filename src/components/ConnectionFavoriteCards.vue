<template lang="pug">
v-item-group
  v-container(grid-list-md ma-0 pa-0)
    v-layout(row wrap)
      v-flex(
        xs4
        v-for="connection in connections"
        :key="connection.uuid"
      )
        v-item
          v-card(
            slot-scope="{ active, toggle }"
            :class="{ 'elevation-10': active }"
            @click="toggle"
          )
            v-card-title(
              class="primary white--text py-0"
            )
              v-timeline(dense)
                v-timeline-item(
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

      v-flex(xs4)
        v-item
          v-card(
            slot-scope="{ active, toggle }"
            :class="{ 'elevation-10': active }"
            @click="toggle"
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
    cardActive: "green lighten-3",
    cards: [
      {
        uuid: "123",
        title: "Card1"
      }
    ]
  }),
  computed: {
    connections() {
      return this.$store.state.connections;
    }
  },
  methods: {
    lastUsed(date) {
      console.log(date);
      if (date === null) {
        return "Not used yet";
      }

      return date;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  height: 100%;
  min-height: 300px;
}
.v-card__title {
  height: 80%;
}
.v-card__text,
.v-timeline {
  user-select: none;
}
.v-timeline {
  height: 100%;
}
</style>
