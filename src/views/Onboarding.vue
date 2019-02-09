<template lang="pug">
v-card
  v-card-title(class="primary darken-1")
    h2(class="subheader white--text") TAKE.ME.HOME. QUICKSTART
    v-spacer

    v-dialog(
      v-model="dialog"
      max-width="290"
      @keydown.esc="closeDialog()"
    )
      v-btn(
        slot="activator"
        flat
        class="white--text"
      ) Skip

      v-card
        v-card-title(
          class="headline grey lighten-2"
          primary-title
        ) Are you sure?

        v-card-text The tutorial will give you a quick overview over all functions. You can re-visit it later, if you want to.

        v-divider

        v-card-actions
          v-spacer

          v-btn(
            color="green darken-1"
            flat
            @click="closeDialog()"
          ) Cancel
          v-btn(
            color="green darken-1"
            flat
            @click="skipTutorial()"
          ) Skip tutorial

  v-stepper(v-model="step")
    v-stepper-header
      v-stepper-step(
        complete="step > 1"
        step="1"
      ) A
    
      v-divider

      v-stepper-step(
        complete
        :complete="step > 2"
        step="2"
      ) B

      v-divider

      v-stepper-step(
        :complete="step > 3"
        step="3"
      ) C

    v-stepper-items
      v-stepper-content(step="1")
        v-card(
          class="mb-5"
          color="grey lighten-3"
          flat
          height="100px"
        )
          v-card-text With take.me.home

        v-layout(flex)
          v-spacer

          v-btn(
            color="primary"
            @click="nextStep()"
          ) Continue

      v-stepper-content(step="2")
        v-card(
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        )
          v-card-text ASD

        v-layout(flex)
          v-btn(
            flat
            @click="previousStep()"
          ) Back

          v-spacer

          v-btn(
            color="primary"
            @click="nextStep()"
          ) Continue

      v-stepper-content(step="3")
        v-card(
          class="mb-5"
          color="grey lighten-1"
          height="200px"
        )

        v-layout(flex)
          v-btn(
            flat
            @click="previousStep()"
          ) Back

          v-spacer

          v-btn(
            color="primary"
            @click="nextStep()"
          ) Continue
</template>

<script>
export default {
  data: () => ({
      step: 0,
      dialog: false
  }),
  methods: {
    nextStep() {
      this.step++
    },
    previousStep() {
      this.step--
    },
    closeDialog() {
      this.dialog = false
    },
    skipTutorial() {
      this.closeDialog()
      console.log("Skipped tutorial!")
    }
  }
}
</script>
