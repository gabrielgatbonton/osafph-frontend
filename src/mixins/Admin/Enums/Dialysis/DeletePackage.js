import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    dialysis_package_id: null,
  }),
  methods: {
    ...mapActions("dialysis_items_actions", ["deleteDialysisPackage"]),
    deleteActivator(id) {
      this.dialysis_package_id = id;
      this.deleteDialog = !this.deleteDialog;
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
    deleteItem() {
      this.deleteDialysisPackage(this.dialysis_package_id)
        .catch((error) => {
          console.error("Error Deleting Dialysis Package", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
