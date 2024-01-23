import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      service_type: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.service_type = [];
      if (this.$v.payload.service_type.$dirty) {
        !this.$v.payload.service_type.required &&
          errors.service_type.push("Service Type is required");
      }
      return errors;
    },
  },
};
