import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      name: { required },
      initial_contribution: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.name = [];
      if (this.$v.payload.name.$dirty) {
        !this.$v.payload.name.required &&
          errors.name.push("Name is required");
      }

      errors.initial_contribution = [];
      if (this.$v.payload.initial_contribution.$dirty) {
        !this.$v.payload.initial_contribution.required &&
          errors.initial_contribution.push("Initial Contribution is required");
      }

      return errors;
    },
  },
};
