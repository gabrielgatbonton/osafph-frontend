export default {
  data: () => ({
    deleteDialog: false,
  }),
  methods: {
    deleteActivator() {
      this.deleteDialog = !this.deleteDialog;
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
  },
};
