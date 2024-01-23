import { required, requiredIf } from "vuelidate/lib/validators";
export default {
  validations: {
    payload: {
      scheduled_date: { required },
      crowd_funding_backer: {
        required: requiredIf((value) => {
          return value && value.service_type === "CONSULTATION";
        }),
      },
      remarks: {},
      hospital: { required },
      status: { required },
    },
    selects: {
      serviceable_type: { required },
    },
  },
  computed: {
    errorMessages() {
      const errors = {};

      errors.serviceable_type = [];
      if (this.$v.selects.serviceable_type.$dirty) {
        !this.$v.selects.serviceable_type.required &&
          errors.serviceable_type.push("Specialty is required");
      }

      errors.scheduled_date = [];
      if (this.$v.payload.scheduled_date.$dirty) {
        !this.$v.payload.scheduled_date.required &&
          errors.scheduled_date.push("Scheduled Date is required");
      }

      errors.crowd_funding_backer = [];
      if (this.$v.payload.crowd_funding_backer.$dirty) {
        !this.$v.payload.crowd_funding_backer.required &&
          errors.crowd_funding_backer.push("Crowd Funding is required");
      }

      errors.hospital = [];
      if (this.$v.payload.hospital.$dirty) {
        !this.$v.payload.hospital.required &&
          errors.hospital.push("Medical Site is required");
      }

      errors.status = [];
      if (this.$v.payload.status.$dirty) {
        !this.$v.payload.status.required &&
          errors.status.push("Status is required");
      }

      return errors;
    },
  },
};
