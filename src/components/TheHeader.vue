<template lang="pug">
  v-toolbar(
    :color="color"
    dark
    fixed
    app
    scroll-off-screen)
    v-toolbar-title(v-text="title")
</template>

<script>
export default {
  name: 'TheHeader',
  data: () => ({
    color: 'blue',
    title: 'TAKE.ME.HOME.'
  })
}
</script>
