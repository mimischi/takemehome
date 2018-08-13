<template lang="pug">
v-layout(row)
  template(v-for="button in buttons")
    v-flex(
      :key="button.id"
      :xs5="button.xs5"
      :xs6="button.xs6"
    )
      v-btn(
        :block="button.block"
        :color="button.color"
        :large="button.large"
        :loading="buttonLoading"
        :disabled="buttonDisabled"
        @click="button.callback"
      ) {{ button.text }}
    v-spacer(v-if="button.id === buttons[0].id")
</template>

<script>
export default {
  name: 'ConnectionButton',
  props: ['buttonDisabled', 'buttonLoading'],
  data: vm => ({
    buttons: [
      {
        id: 1,
        name: 'submit',
        text: 'Submit',
        color: 'primary',
        block: true,
        large: true,
        xs5: false,
        xs6: true,
        callback: vm.submit
      },
      {
        id: 2,
        name: 'reset',
        text: 'Reset',
        color: 'normal',
        block: true,
        large: true,
        xs5: true,
        xs6: false,
        callback: vm.reset
      }
    ]
  }),
  mounted () {
    if (this.settings.submitButtonOnRightSide) {
      this.toggleButtonOrder()
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
    }
  },
  watch: {
    buttonOrder: function () {
      this.buttons.reverse()
    }
  }
}
</script>
