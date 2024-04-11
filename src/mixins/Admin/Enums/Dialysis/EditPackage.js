import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapActions("dialysis_items_actions", [
      "fetchDialysisPackage",
      "updateDialysisPackage",
    ]),
    activator(id) {
      this.dialog = !this.dialog;

      return this.fetchDialysisPackage(id).catch((error) => {
        console.error("Error fetching Dialysis Package in Edit: ", error);
      });
    },
    resetEditActivator(data) {
      this.dialog = data;
    },
    submitForm(payload) {
      return this.updateDialysisPackage({
        dialysis_package_id: this.dialysis_package.id,
        data: payload,
      })
        .catch((error) => {
          console.error("Error Updating in Package-Table: ", error);
        })
        .finally(() => {
          this.dialog = false;
        });
    },
  },
  computed: {
    ...mapState("dialysis_items_actions", ["dialysis_package"]),
  },
};
