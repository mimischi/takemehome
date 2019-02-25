<script>
export default {
  name: "IsMobile",
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    }
  }
};
</script>
