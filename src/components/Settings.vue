<template lang="pug">
  v-layout(
    row
    justify-center
  )
    v-dialog(
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    )
      v-card
        v-toolbar(
          dark
          color="primary"
        )
          v-btn(
            icon
            dark
            @click.native="hideSettings"
          )
            v-icon close
          v-toolbar-title Settings
        v-list(
          three-line
          subheader
        )
          v-subheader General
          v-list-tile(avatar)
            v-list-tile-action
              v-checkbox(
                :disabled="!settingsDisabled"
                v-model="settings.submitButtonOnRightSide"
                @change="toggleButtonOrder"
              )
            v-list-tile-content
              v-list-tile-title Submit button on the right
              v-list-tile-sub-title When checked, the submit button will be shown on the right. Settings will be on the left.
        v-list(
          three-line
          subheader
        )
          v-subheader Connection settings
          v-list-tile(avatar)
            v-list-tile-action
              v-checkbox(
                :disabled="!settingsDisabled"
                v-model="settings.rememberConnection"
                @change="updateSettings('rememberConnection')"
              )
            v-list-tile-content
              v-list-tile-title Remember connection
              v-list-tile-sub-title Check this box if you want the page to remember your last connection.
          v-list-tile(avatar)
            v-list-tile-action
              v-checkbox(
                :disabled="!settings.rememberConnection"
                v-model="settings.autoRetrieveConnection"
                @change="updateSettings('autoRetrieveConnection')"
              )
            v-list-tile-content
              v-list-tile-title Auto-Retrieve on next visit
              v-list-tile-sub-title Check if you want your favorite connection to be auto-retrieved on your next visit.
        v-list(
          three-line
          subheader
        )
          v-subheader Danger zone
          v-container(fluid grid-list-lg)
            v-layout(row wrap)
              v-flex(xs5)
                v-card
                  v-card-title(primary-title)
                    div You are about to reset all settings that you saved locally.
                  v-card-actions
                    v-btn(
                      @click.native="resetSettings"
                      color="error"
                      ) Delete settings
</template>

<script>
import { setValues } from '@/api'

export default {
  name: 'Settings',
  props: ['dialog'],
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

      if (
        identity === 'rememberConnection' &&
        this.$store.state.settings[identity] === true
      ) {
        for (let identity of ['departure', 'destination']) {
          const values = this.$store.state.stations[identity]
          const type = 'stations'
          console.log(values)
          console.log(identity)
          setValues(type, identity, values)
        }
      }
    },
    hideSettings () {
      this.$emit('close')
    },
    resetSettings () {
      this.$store.dispatch('RESET_FORM')
    }
  },
  computed: {
    settingsDisabled: function () {
      return this.$store.state.termsAccepted
    },
    settings: function () {
      return this.$store.state.settings
    }
  }
}
</script>
