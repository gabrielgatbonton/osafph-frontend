import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      hospital: { required },
      crowd_funding_backer: {},
      all_items_sponsored: {},
      dialysis_items: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.hospital = [];
      if (this.$v.payload.hospital.$dirty) {
        !this.$v.payload.hospital.required &&
          errors.hospital.push("Medical Site is required");
      }

      errors.dialysis_items = [];
      if (this.$v.payload.dialysis_items.$dirty) {
        !this.$v.payload.dialysis_items.required &&
          errors.dialysis_items.push("Dialysis Items is required");
      }

      return errors;
    },
  },
};
