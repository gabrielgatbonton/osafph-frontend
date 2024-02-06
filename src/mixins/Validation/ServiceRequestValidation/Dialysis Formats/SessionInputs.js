import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      total_sessions: { required },
      schedule: {
        $each: {
          date: { required }, // Validation rule for date property
          session: { required }, // Validation rule for session property
        },
      },
      dialysis_machine: { required },
      all_sessions_sponsored: {},
    },
  },
  methods: {
    // Method to validate session dates
    validateSessionDate(index) {
      // const session = this.payload.schedule[index];
      if (this.$v.payload.schedule.$each.$iter[index].date.$dirty) {
        console.log(
          `${index}: `,
          this.$v.payload.schedule.$each.$iter[index].date.required
        );
        if (this.$v.payload.schedule.$each.$iter[index].date.required) {
          return false;
        }
        return false;
      }
      return true;
      // if (!session || !session.date) return true; // If no session or date is present, consider it valid
      // return this.$v.payload.schedule.$each[index].date.$dirty; // Check if the field has been touched
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

      errors.schedule_date = this.payload.schedule.map((session, index) => {
        const sessionErrors = [];
        if (this.$v.payload.schedule.$each.$iter[index].date.$dirty) {
          !this.$v.payload.schedule.$each.$iter[index].date.required &&
            sessionErrors.push(`Date is required`);
        }
        return sessionErrors;
      });

      errors.schedule_session = this.payload.schedule.map((session, index) => {
        const sessionErrors = [];
        if (this.$v.payload.schedule.$each.$iter[index].session.$dirty) {
          !this.$v.payload.schedule.$each.$iter[index].session.required &&
            sessionErrors.push(`Session is required`);
        }
        return sessionErrors;
      })

      // // Error messages for each session in the schedule array
      // errors.schedule_date = this.payload.schedule.map((session, index) => {
      //   const sessionErrors = [];
      //   // console.log(this.validateSessionDate(index));
      //   if (!this.validateSessionDate(index)) {
      //     sessionErrors.push(`Date is required for Session ${index + 1}`);
      //   }
      //   // console.log("Check", !this.$v.payload.schedule.$each.$iter[index].required)
      //   // if (!this.$v.payload.schedule.$each.$iter[index].required) {
      //   //   sessionErrors.push(`Date is required for Session ${index + 1}`);
      //   // }
      //   return sessionErrors;
      // });

      errors.dialysis_machine = [];
      if (this.$v.payload.dialysis_machine.$dirty) {
        !this.$v.payload.dialysis_machine.required &&
          errors.dialysis_machine.push("Dialysis Machine is required");
      }

      return errors;
    },
  },
};
