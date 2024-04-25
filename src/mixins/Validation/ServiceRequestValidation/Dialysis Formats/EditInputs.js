import { required } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      hospital: { required },
      dialysis_machine: { required },
      scheduled_date: { required },
      date_released: {},
      scheduled_session: { required },
      status: { required },
      remarks: {},
      dialysis_packages: {
        $each: {
          name: { required },
          funder: {},
        },
      },
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

      errors.dialysis_package_name = this.payload.dialysis_packages.map(
        (_, index) => {
          const sessionErrors = [];

          if (
            this.$v.payload.dialysis_packages.$each.$iter[index].name.$dirty
          ) {
            !this.$v.payload.dialysis_packages.$each.$iter[index].name
              .required && sessionErrors.push("Dialysis Package is required");
          }
          return sessionErrors;
        }
      );

      return errors;
    },
  },
};
