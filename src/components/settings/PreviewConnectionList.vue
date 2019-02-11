<template lang="pug">
v-flex(
  xs12
  md6
  @mouseover="hover = true"
  @mouseout="hover = false"
  @click="select()"
)
  v-card(
    :elevation="elevation"
    height="100%"
  )
    v-card-title(class="pb-0 no-user-select")
      h3 Show favorites
    v-card-text(class="pb-0 pt-0")
      connection-skeleton(:active="hover || active")
</template>

<script>
import TimelineSkeleton from "@/components/timeline/TimelineSkeleton";
import ConnectionSkeleton from "@/components/settings/ConnectionSkeleton";

export default {
  data: () => ({
    hover: false,
    elevation: 1,
    name: "connectionFavorites"
  }),
  components: { ConnectionSkeleton, TimelineSkeleton },
  props: {
    selected: {
      type: String,
      default: null
    }
  },
  computed: {
    active() {
      return this.selected == this.name;
    }
  },
  methods: {
    select() {
      this.$emit("select", this.name);
    }
  },
  watch: {
    active() {
      this.elevation = this.active ? 8 : 1;
    }
  }
};
</script>

<style scoped>
.no-user-select {
  user-select: none;
}
</style>
