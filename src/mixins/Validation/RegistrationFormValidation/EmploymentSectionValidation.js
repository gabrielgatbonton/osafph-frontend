import { maxLength } from "vuelidate/lib/validators";
export default {
  validations: {
    data: {
      employer_name: { maxLength: maxLength(255) },
      employer_address: { maxLength: maxLength(255) },
      employer_contact_number: {},
      employment_status: {},
      other_employment_status: {},
      occupation: { maxLength: maxLength(255) },
      profession: {},
      other_profession: {},
      philhealth_id_number: {},
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.employer_name = [];
      if (this.$v.data.employer_name.$dirty) {
        !this.$v.data.employer_name.maxLength &&
          errors.employer_name.push("Maximum of 255 characters only");
      }
      errors.employer_address = [];
      if (this.$v.data.employer_address.$dirty) {
        !this.$v.data.employer_address.maxLength &&
          errors.employer_address.push("Maximum of 255 characters only");
      }
      errors.occupation = [];
      if (this.$v.data.occupation.$dirty) {
        !this.$v.data.occupation.maxLength &&
          errors.occupation.push("Maximum of 255 characters only");
      }
      return errors;
    },
  },
};
