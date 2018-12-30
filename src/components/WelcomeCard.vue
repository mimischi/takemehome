<template lang="pug">
  v-card
    v-card-title(class="primary white--text")
      h3(class="headline") Get started
      v-spacer
      v-btn(
        icon
        dark
        @click="closeWelcome()"
      )
        v-icon close

    v-card-text(class="py-0")
      v-timeline(
        dense
        align-top
      )
        v-timeline-item(
          v-for="item in items"
          :small="item.small || false"
          :color="item.color || `primary`"
          :icon="item.icon || ``"
          fill-dot
        )
          v-layout(pt-3)
            v-flex(xs12) {{ item.text }}
</template>

<script>
export default {
  name: "WelcomeCard",
  data: () => ({
    items: [
      {
        small: false,
        text:
          "TAKE.ME.HOME makes it easy to repeatedly look up your favorite connection.",
        icon: "train"
      },
      {
        small: true,
        color: "primary lighten-1",
        text:
          "Automagically retrieve your favorite train connections on your next visit."
      },
      {
        small: true,
        color: "blue lighten-2",
        text: "Go ahead and add your first connection!"
      }
    ]
  }),
  methods: {
    closeWelcome() {
      this.$store.dispatch("toggleWelcome");
    }
  }
};
</script>
