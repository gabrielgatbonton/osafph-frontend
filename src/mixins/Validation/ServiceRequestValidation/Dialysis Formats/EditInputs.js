import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      //Edit
      scheduled_date: { required },
      date_released: {},
      scheduled_session: { required },
      status: { required },
      remarks: {},
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.status = [];
      if (this.$v.payload.status.$dirty) {
        !this.$v.payload.status.required &&
          errors.status.push("Status is required");
      }

      errors.scheduled_date = [];
      if (this.$v.payload.scheduled_date.$dirty) {
        !this.$v.payload.scheduled_date.required &&
          errors.scheduled_date.push("Scheduled Date is required");
      }

      // errors.date_released = [];
      // if (this.$v.payload.date_released.$dirty) {
      //   !this.$v.payload.date_released.required &&
      //     errors.date_released.push("Date Released is required");
      // }

      errors.scheduled_session = [];
      if (this.$v.payload.scheduled_session.$dirty) {
        !this.$v.payload.scheduled_session.required &&
          errors.scheduled_session.push("Schedule Session is required");
      }

      return errors;
    },
  },
};
