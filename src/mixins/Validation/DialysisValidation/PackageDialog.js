import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      name: { required },
      dialysis_item_options: { required },
      price: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.name = [];
      if (this.$v.payload.name.$dirty) {
        !this.$v.payload.name.required &&
          errors.name.push("Package Name is required");
      }

      errors.dialysis_item_options = [];
      if (this.$v.payload.dialysis_item_options.$dirty) {
        !this.$v.payload.dialysis_item_options.required &&
          errors.dialysis_item_options.push("Dialysis Item is required");
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
