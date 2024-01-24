import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      //Main
      crowd_funding_backer: {},
      total_sessions: { required },
      hospital: { required },
      schedule: {}, //?
      dialysis_items: { required },
      all_items_sponsored: {},
      dialysis_machine: { required },
      all_sessions_sponsored: {},
      status: {},   //?
      remarks: {},

      //Edit
      scheduled_date: {
        //?
      },
      date_released: {
        //?
      },
      scheduled_session: {
        //?
      },
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

      errors.hospital = [];
      if (this.$v.payload.hospital.$dirty) {
        !this.$v.payload.hospital.required &&
          errors.hospital.push("Medical Site is required");
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

      errors.dialysis_machine = [];
      if (this.$v.payload.dialysis_machine.$dirty) {
        !this.$v.payload.dialysis_machine.required &&
          errors.dialysis_machine.push("Dialysis Machine is required");
      }

      errors.status = [];
      if (this.$v.payload.status.$dirty) {
        !this.$v.payload.status.required &&
          errors.status.push("Status is required");
      }

      //Edit Validations only
      errors.scheduled_date = [];
      if (this.$v.payload.scheduled_date.$dirty) {
        !this.$v.payload.scheduled_date.required &&
          errors.scheduled_date.push("Scheduled Date is required");
      }

      errors.date_released = [];
      if (this.$v.payload.date_released.$dirty) {
        !this.$v.payload.date_released.required &&
          errors.date_released.push("Date Released is required");
      }

      errors.scheduled_session = [];
      if (this.$v.payload.scheduled_session.$dirty) {
        !this.$v.payload.scheduled_session.required &&
          errors.scheduled_session.push("Schedule Session is required");
      }

      return errors;
    },
  },
};
