<template lang="pug">
v-layout(row)
  template(v-for="button in buttons")
    v-flex(
      :key="button.id"
      :xs2="button.name === 'reset'"
      :xs9="button.name === 'submit'"
    )
      v-btn(
        :block="button.block"
        :color="button.color"
        :large="button.large"
        :loading="loading(button.name)"
        :disabled="enableSettingsButton(button.name)"
        @click="button.callback"
      ) {{ button.text }}
        v-icon(
          v-if="button.icon"
          right
          ) {{ button.icon }}
    v-spacer(v-if="button.id === buttons[0].id")
</template>

<script>
import ConnectionButtonIcon from '@/components/connection/ConnectionButtonIcon'

export default {
  name: 'ConnectionButton',
  props: ['buttonDisabled', 'buttonLoading'],
  components: { ConnectionButtonIcon },
  data: vm => ({
    buttons: [
      {
        id: 1,
        name: 'submit',
        text: 'Submit',
        color: 'primary',
        block: true,
        large: true,
        icon: false,
        callback: vm.submit
      },
      {
        id: 2,
        name: 'settings',
        text: 'Settings',
        color: '',
        block: true,
        large: true,
        icon: 'settings',
        callback: vm.showSettings
      }
      // {
      //   id: 2,
      //   name: 'reset',
      //   text: 'Reset',
      //   color: 'normal',
      //   block: true,
      //   large: true,
      //   callback: vm.reset
      // }
    ]
  }),
  mounted () {
    if (this.settings.submitButtonOnRightSide) {
      this.buttons.reverse()
    }
  },
  computed: {
    buttonOrder () {
      return this.settings.submitButtonOnRightSide
    },
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    },
    reset () {
      this.$emit('reset')
    },
    showSettings () {
      this.$emit('settings')
    },
    loading (name) {
      return name === 'submit' ? this.buttonLoading : false
    },
    enableSettingsButton (name) {
      if (name === 'submit') {
        return this.buttonDisabled
      }
      return false
    }
  },
  watch: {
    buttonOrder: function () {
      this.buttons.reverse()
    }
  }
}
</script>
