import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      //Main
      crowd_funding_backer: {},
      total_sessions: { required },
      schedule: {}, //?
      all_items_sponsored: {},
      all_sessions_sponsored: {},
      dialysis_items: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      //Main, used for adding and some for edit
      errors.total_sessions = [];
      if (this.$v.payload.total_sessions.$dirty) {
        !this.$v.payload.total_sessions.required &&
          errors.total_sessions.push("Total Sessions is required");
      }

      //   errors.schedule = [];
      //   if (this.$v.payload.schedule.$dirty) {
      //     !this.$v.payload.schedule.required &&
      //       errors.schedule.push("Schedule is required");
      //   }

      errors.dialysis_items = [];
      if (this.$v.payload.dialysis_items.$dirty) {
        !this.$v.payload.dialysis_items.required &&
          errors.dialysis_items.push("Dialysis Items is required");
      }

      return errors;
    },
  },
};
