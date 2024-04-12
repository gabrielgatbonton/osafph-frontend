import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapActions("dialysis_items_actions", [
      "fetchDialysisItem",
      "updateDialysisItem",
    ]),
    activator(id) {
      this.dialog = !this.dialog;

      return this.fetchDialysisItem(id).catch((error) => {
        console.error("Error fetching Dialysis Item in Edit: ", error);
      });
    },
    resetEditActivator(data) {
      this.dialog = data;
    },
    submitForm(payload) {
      return this.updateDialysisItem({
        dialysis_item_id: this.dialysis_item.id,
        data: payload,
      })
        .catch((error) => {
          console.error("Error Updating in Items-Table: ", error);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
  computed: {
    ...mapState("dialysis_items_actions", ["dialysis_item"]),
  },
};
