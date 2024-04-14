import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      total_sessions: { required },
      schedule: {
        $each: {
          // Validation rule for date property
          date: { required },
          // Validation rule for session property
          session: { required },
          // Validation rule for dialysis package property
          dialysis_packages: {
            $each: {
              name: { required },
              funder: {},
            },
          },
        },
      },
      dialysis_machine: { required },
      all_sessions_sponsored: {},
      all_items_sponsored: {},
      hospital: { required },
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
          !this.$v.payload.hospital.required &&
            sessionErrors.push(`You must provide Dialysis Hospital`);
          !this.$v.payload.dialysis_machine.required &&
            sessionErrors.push(`You must provide Dialysis Machine`);
          !this.$v.payload.schedule.$each.$iter[index].date.required &&
            sessionErrors.push(`Date is required`);
        }
        return sessionErrors;
      });

      errors.schedule_session = this.payload.schedule.map((session, index) => {
        const sessionErrors = [];
        if (this.$v.payload.schedule.$each.$iter[index].session.$dirty) {
          !this.$v.payload.hospital.required &&
            sessionErrors.push(`You must provide Dialysis Hospital`);
          !this.$v.payload.dialysis_machine.required &&
            sessionErrors.push(`You must provide Dialysis Machine`);
          !this.$v.payload.schedule.$each.$iter[index].session.required &&
            sessionErrors.push(`Session is required`);
        }
        return sessionErrors;
      });

      errors.dialysis_package_name = this.payload.schedule.map((_, index) => {
        const sessionErrors = [];

        this.payload.schedule[index].dialysis_packages.forEach(
          (_, indexPackage) => {
            let packageErrors = [];
            if (
              this.$v.payload.schedule.$each.$iter[index].dialysis_packages
                .$each.$iter[indexPackage].name.$dirty
            ) {
              !this.$v.payload.schedule.$each.$iter[index].dialysis_packages
                .$each.$iter[indexPackage].name.required &&
                packageErrors.push(`Dialysis Package is required`);
            }
            sessionErrors.push(packageErrors);
          }
        );
        return sessionErrors;
      });

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

      errors.hospital = [];
      if (this.$v.payload.hospital.$dirty) {
        !this.$v.payload.hospital.required &&
          errors.hospital.push("Medical Site is required");
      }

      return errors;
    },
  },
};
