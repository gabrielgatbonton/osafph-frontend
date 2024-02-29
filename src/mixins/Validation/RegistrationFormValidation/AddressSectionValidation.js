import {
  required,
  maxLength,
} from "vuelidate/lib/validators";
export default {
  validations: {
    data: {
      address: { required, maxLength: maxLength(255) },
      country: { required },
      region: { required },
      province: { required },
      municipality: { required },
      barangay: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      // Address field errors
      errors.address = [];
      if (this.$v.data.address.$dirty) {
        !this.$v.data.address.required &&
          errors.address.push("Address is required");
        !this.$v.data.address.maxLength &&
          errors.address.push("A limit of 255 characters is exceeded");
      }

      // Province field errors
      errors.province = [];
      if (this.$v.data.province.$dirty) {
        !this.$v.data.province.required &&
          errors.province.push("Province is required");
      }

      // Municipality field errors
      errors.municipality = [];
      if (this.$v.data.municipality.$dirty) {
        !this.$v.data.municipality.required &&
          errors.municipality.push("Municipality is required");
      }

      // Barangay field errors
      errors.barangay = [];
      if (this.$v.data.barangay.$dirty) {
        !this.$v.data.barangay.required &&
          errors.barangay.push("Barangay is required");
      }

      // Region field errors
      errors.region = [];
      if (this.$v.data.region.$dirty) {
        !this.$v.data.region.required &&
          errors.region.push("Region is required");
      }

      errors.country = [];
      if (this.$v.data.country.$dirty) {
        !this.$v.data.country.required &&
          errors.country.push("Country is required");
      }

      return errors;
    },
  },
};
