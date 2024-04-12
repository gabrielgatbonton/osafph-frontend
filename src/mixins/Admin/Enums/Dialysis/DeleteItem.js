import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    dialysis_item_id: null,
  }),
  methods: {
    ...mapActions("dialysis_items_actions", ["deleteDialysisItem"]),
    deleteActivator(id) {
      this.dialysis_item_id = id;
      this.deleteDialog = !this.deleteDialog;
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
    deleteItem() {
      this.deleteDialysisItem(this.dialysis_item_id)
        .catch((error) => {
          console.error("Error Deleting Dialysis Item", error);
        })
        .finally(() => {
          this.deleteDialog = false;
        });
    },
  },
};
