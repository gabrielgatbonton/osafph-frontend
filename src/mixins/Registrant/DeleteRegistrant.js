import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    citizen_id: null,
  }),
  methods: {
    ...mapActions("registrants", ["deleteRegistrant"]),
    deleteActivator(citizen_id) {
      this.deleteDialog = !this.deleteDialog;
      this.citizen_id = citizen_id;
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
    deleteItem() {
      this.loading = true;
      this.deleteRegistrant(this.citizen_id)
        .catch((error) => {
          console.log("Error Proceding with delete:", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
