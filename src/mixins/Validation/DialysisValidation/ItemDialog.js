import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      name: { required },
      price: { required },
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

      errors.price = [];
      if (this.$v.payload.price.$dirty) {
        !this.$v.payload.price.required &&
          errors.price.push("Price is required");
      }

      return errors;
    },
  },
};
