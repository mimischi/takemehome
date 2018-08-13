<template lang="pug">
  div
    v-layout(row)
      v-flex(xs6)
        v-switch(
          label="Remember connection"
          v-model="settings.rememberConnection"
          @change="updateSettings('rememberConnection')"
        )
      v-flex(xs6)
        v-switch(
          label="Auto-Retrieve on next visit"
          v-model="settings.autoRetrieveConnection"
          @change="updateSettings('autoRetrieveConnection')"
          :disabled="!settings.rememberConnection"
          )
    v-switch(
      label="Submit button on the right"
      v-model="settings.submitButtonOnRightSide"
      @change="toggleButtonOrder"
    )
</template>

<script>
export default {
  name: 'Settings',
  methods: {
    toggleButtonOrder () {
      this.updateSettings('submitButtonOnRightSide')
    },
    updateSettings (identity) {
      const payload = {
        identity: identity,
        value: this.settings[identity]
      }
      this.$store.dispatch('UPDATE_SETTINGS', payload)
    }
  },
  computed: {
    settings: function () {
      return this.$store.state.settings
    }
  }
}
</script>
