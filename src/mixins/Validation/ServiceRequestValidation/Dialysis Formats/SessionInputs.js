import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      total_sessions: { required },
      schedule: {},
      dialysis_machine: { required },
      all_sessions_sponsored: {},
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.total_sessions = [];
      if (this.$v.payload.total_sessions.$dirty) {
        !this.$v.payload.total_sessions.required &&
          errors.total_sessions.push("Total Sessions is required");
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
