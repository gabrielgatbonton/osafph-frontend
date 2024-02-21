import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      name: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.name = [];
      if (this.$v.payload.name.$dirty) {
        !this.$v.payload.name.required &&
          errors.name.push("Item Name is required");
      }

      return errors;
    },
  },
};
