<template lang="pug">
v-flex(
  xs12
  md6
  @mouseover="active = true"
  @mouseout="active = false"
)
  v-card(
    :elevation="elevation"
    height="100%"
    )
    v-card-text
      connection-skeleton(:active="active")
</template>

<script>
import TimelineSkeleton from "@/components/timeline/TimelineSkeleton";
import ConnectionSkeleton from "@/components/settings/ConnectionSkeleton";

export default {
  data: () => ({
    active: false,
    elevation: 1
  }),
  components: { ConnectionSkeleton, TimelineSkeleton },
  watch: {
    active() {
      this.elevation = this.active ? 8 : 1;
    }
  }
};
</script>
