import { mapActions } from "vuex";
export default {
  data: () => ({
    deleteDialog: false,
    deletion: null,
  }),
  methods: {
    ...mapActions("card", ["deleteSignature", "deleteBiometrics"]),
    deleteActivator(target) {
      this.deleteDialog = !this.deleteDialog;

      //Check for deletion
      if (target === "signature") {
        this.deletion = target;
      } else if (target === "biometrics") {
        this.deletion = target;
      }
    },
    resetActivator(data) {
      this.deleteDialog = data;
    },
    deleteItem() {
      if (this.deletion === "signature") {
        this.deleteSignature(this.registrant.citizen.id) //registrant.citizen.id came from the component which this mixin is imported to.
          .then(() => {
            this.fetchRegistrant();
          })
          .catch((error) => {
            console.log("Error deleting signature", error);
          })
          .finally(() => {
            this.deleteDialog = false;
          });
      } else if (this.deletion === "biometrics") {
        this.deleteBiometrics(this.registrant.citizen.id) //registrant.citizen.id came from the component which this mixin is imported to.
          .then(() => {
            this.fetchRegistrant();
          })
          .catch((error) => {
            console.log("Error deleting biometrics", error);
          })
          .finally(() => {
            this.deleteDialog = false;
          });
      }
    },
  },
};
