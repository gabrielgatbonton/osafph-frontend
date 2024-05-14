// Attach the following:
// Add this style to the following data-tables which require this
// :style="`max-width: ${breakpointVal};`"
export default {
  data: () => ({
    breakpointVal: "85vw",
  }),
  computed: {
    size() {
      return this.$vuetify.breakpoint;
    },
  },
  watch: {
    size: {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        if (newVal.xs || newVal.sm) {
          this.breakpointVal = "95vw";
        } else {
          this.breakpointVal = "85vw";
        }
      },
    },
  },
};
