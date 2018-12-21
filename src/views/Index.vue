<template lang="pug">
  v-layout
    welcome(v-if="!messageRead")
    connection(v-else)
</template>

<script>
import Welcome from '@/components/Welcome'
import Connection from '@/components/connection/Connection'

export default {
  name: 'index',
  components: { Connection, Welcome },
  computed: {
    messageRead: function () {
      return this.$store.state.messageRead
    }
  }
}
</script>
