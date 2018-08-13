<template lang="pug">
  v-alert(
    color="error"
    icon="warning"
    :value="errors"
    v-model="alert"
    dismissible
    transition="scale-transition"
    ) {{ errors }}
</template>

<script>
export default {
  name: 'ConnectionAlert',
  props: ['initialAlert', 'errors'],
  computed: {
    alert: {
      get () {
        return this.initialAlert
      },
      set () {
        this.$emit('close')
      }
    }
  }
}
</script>

