<template lang="pug">
div
  template(v-if="position === left")
    v-icon(left) {{ icon }}
  template(v-else)
    v-icon(right) {{ icon }}
</template>

<script>
export default {
  name: 'ConnectionButtonIcon',
  props: ['icon', 'position', 'text']
}
</script>
