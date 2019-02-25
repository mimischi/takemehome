<template lang="pug">
  v-container(class="container--skeleton")
    v-card
      v-card-title(:class="cardTitleClass")
      v-list
        v-list-tile
          v-list-tile-action
            v-btn(flat icon disabled)
              v-icon(v-if="active") star
              v-icon(v-else) star_border

          v-list-tile-content
            v-list-tile-sub-title(class="text--primary")
              p.station &nbsp;
            v-list-tile-sub-title(class="text--primary")
              p.station &nbsp;

          v-list-tile-action
            v-list-tile-action-text
              v-menu(disabled)
                v-btn(
                  slot="activator"
                  disabled
                  icon
                )
                  v-icon more_vert

        v-list-tile
          v-list-tile-action
            v-btn(flat icon disabled)
              v-icon(v-if="active") star_border
              v-icon(v-else) star_border

          v-list-tile-content
            v-list-tile-sub-title(class="text--primary")
              p.station &nbsp;
            v-list-tile-sub-title(class="text--primary")
              p.station &nbsp;

          v-list-tile-action
            v-list-tile-action-text
              v-menu(disabled)
                v-btn(
                  slot="activator"
                  disabled
                  icon
                )
                  v-icon more_vert
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardTitleClass() {
      const baseClass = { "white--text": true };
      const inactiveClass = { grey: true, "darken-1": true };
      const activeClass = { primary: true, "lighten-2": true };

      const combinedClass = this.active ? activeClass : inactiveClass;

      return Object.assign(baseClass, combinedClass);
    }
  }
};
</script>

<style>
.container--skeleton {
  padding: 12px 12px 12px 12px;
}
.station {
  background-color: #a9a9a9;
  height: 1em;
  width: 95%;
}

.station:first-of-type {
  margin-top: 0.2em;
}
</style>
