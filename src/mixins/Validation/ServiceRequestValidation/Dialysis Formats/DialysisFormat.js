import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      hospital: { required },
      dialysis_machine: { required },
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

      errors.dialysis_machine = [];
      if (this.$v.payload.dialysis_machine.$dirty) {
        !this.$v.payload.dialysis_machine.required &&
          errors.dialysis_machine.push("Dialysis Machine is required");
      }

      return errors;
    },
  },
};
